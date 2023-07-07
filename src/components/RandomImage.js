import React, {useState, useEffect } from 'react'

const RandomImage = () => {

    const [randomImage, setRandomImage] = useState('')
    const [imageIndex, setIndexImage] = useState(0)
 
    //unsplash, provides random/searched images 
    let randomPage = Math.ceil(Math.random() * 3)
    let endPoint = `https://api.unsplash.com/search/photos?page=${randomPage}&query=interior&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(endPoint)
            const data = await response.json()
            setRandomImage(data)

            const size = data.results.length
            let randomIndex = Math.floor(Math.random() * size)
            setIndexImage(randomIndex)
            console.log(data, randomIndex, randomPage)
        }

        fetchImages()
    }, [])

 

  return (
    <>
        <div>
            {!randomImage ? <h3>Loading...</h3>: 
                <>
                <h5>Design Inspiration</h5>
                <img src={randomImage.results[imageIndex].urls.thumb} style={{width:'100%', borderRadius: '5px'}} />
                </>
            }
             
        </div>
    </>
    
  )
}

export default RandomImage