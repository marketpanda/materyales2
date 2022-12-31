import React, {useState} from 'react'

const FloorArea = () => {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [area, setArea] = useState('')
  const [message, setMessage] = useState('Console here')

  const initialCostPerSqm = 24000
  const [costPerSquareMeter, setCostPerSquareMeter] = useState(initialCostPerSqm)

  const showLength = (e) => {
    e.preventDefault()
    console.log(e.target.value) 
    setLength(e.target.value)
    
  }

  const showWidth = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setWidth(e.target.value)
    setArea('')
  }

  const showArea = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setArea(e.target.value)

    //resets length
    setLength('')

    //resets width
    setWidth('')
  }

  const showCostPerSquareMeter = (e) => {
    e.preventDefault()
    setCostPerSquareMeter(e.target.value)
  }

  

  const dimensionsActive = (e) => {
    if (area) return area
    return width*length
  }

  const constructionCOst = () => {
    var s = ''
    s = dimensionsActive() * costPerSquareMeter
    // var converted = s.stringToLocale('en-US')
    return s.toLocaleString('en-US')
  }
  
return (
    <div className='app'>
      <div className='rowHandler'>
        
        Length:
        <input type='number' placeholder='Type length here' onChange={showLength} value={length} />
 
      </div>
      <div className='rowHandler'>
      Width: 
      <input type='number' placeholder='Type width here' onChange={showWidth} value={width} />
      </div>
      <div className='rowHandler'>
      Area:
      <input type='number' placeholder={length*width} onChange={showArea} value={area} autoFocus />
      </div>

      <div>
      <hr />
      </div>

      
      <div className='rowHandler'>
      Cost Per Square Meter:
      <input type='number' placeholder={costPerSquareMeter} onChange={showCostPerSquareMeter} value={costPerSquareMeter} />
      </div>

      <div className='rowHandler'>
      Total Construction Cost:
        <div>
          {
            //(dimensionsActive() * costPerSquareMeter)
            
          'Php' + constructionCOst()
          } 
        </div>
      </div>

    </div>
  )
}

export default FloorArea