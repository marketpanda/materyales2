import React, {useState} from 'react'

const __FeedDimensions = ({length, setLength, width, setWidth, area, setArea}) => {
    let rowClassName = 'rowHandler'
  

    const showLength = (e) => {
      e.preventDefault()
      setLength(e.target.value)
      
      // console.log('length', e)  
    }

    const showWidth = (e) => {
      e.preventDefault()
      setWidth(e.target.value)
      setArea('')
      // console.log('width', e)
    }

    const showArea = (e) => {
      e.preventDefault()
      setArea(e.target.value)
      
      //resets length
      setLength('')

      //reset width
      setWidth('')
    }

    // const giveArea = (e) => {
    //   let trueArea = '' 
    //   if (area) trueArea = area
    //   else trueArea = width * length

    //   return trueArea
    // }
 

    return (
      <>

        <div className={rowClassName}>Length:   
          <input type='number' placeholder='Type length here' value={length} onChange={showLength} />
        </div> 
        <div  className={rowClassName}>Width
          <input type='number' placeholder='Type width here' value={width} onChange={showWidth} />
        </div>  
        <div  className={rowClassName}>Area  
          <input type='number' placeholder={length*width} value={area} onChange={showArea} />
        </div>
      </>    
    )
}

export default __FeedDimensions