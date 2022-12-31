import React, {useState} from 'react'
import * as computeSSlab from '../computations/ComputeSuspendedSlab'
 
  
const SuspendedSlab = () => {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [area, setArea] = useState('')
  const [message, setMessage] = useState('Console here')
  
  
  const showLength = (e) => {
    e.preventDefault()
    // console.log(e.target.value) 
    setLength(e.target.value) 
    
  }

  const showWidth = (e) => {
    e.preventDefault()
    // console.log(e.target.value)
    setWidth(e.target.value)
    setArea('')
  }

  const showArea = (e) => {
    e.preventDefault()
    // console.log(e.target.value)
    setArea(e.target.value)

    //resets length
    setLength('')

    //resets width
    setWidth('')
  }

  
  const giveArea = (e) => {
    //var to handle an area from single input or area from LxW
    
    var trueArea = ''
    if (area) {
      trueArea = area
    } else {
      trueArea = width*length
    }
    // setNumPhenolic(countPhenolic)
    return trueArea
  }

  const projectCost = () => {
     
    var s = ''

    s = matCost +
      totalLabor +
      vatFromMaterials +
      contractorsProfit +
      materialsContingency
 
    // var converted = s.stringToLocale('en-US')
    return s.toLocaleString('en-US')
  }
  
  const countSuspendedSlabDetails = () => {
    var theArea = giveArea()
    var theVolume = theArea * .1
    var theLength = length
    var theWidth = width
    
    var objectSuspendedSlab = {
      objPhenolic: computeSSlab.countPhenolic(theArea),
      objCement: computeSSlab.countCement(theVolume),
      objSand: computeSSlab.countSand(theVolume),
      objGravel: computeSSlab.countGravel(theVolume),
      objTenMm: computeSSlab.countTenMm(theLength, theWidth, theArea),
      objCocolumber2x4: computeSSlab.countCocolumber2x4(theArea),
      objTieWire: computeSSlab.countTieWire(theArea),
    }
    
    return objectSuspendedSlab
  }

  const {
    objPhenolic,
    objCement,
    objSand,
    objGravel,
    objTenMm,
    objCocolumber2x4,
    objTieWire
  
  } = countSuspendedSlabDetails()

  

  //map every detail of computation for suspended slab
  var valuesSuspendedSlab = countSuspendedSlabDetails()
  
 
  // <li>15 pcs of 6-linear meter of 2x2 support joist</li>
  // <li>15 pcs of 6-linear meter 2x3 cocolumber</li>
  // <li>8 kg of tie wire, #16</li>
 

  const runSSlab = {
    array: [
      {
        id: 1,
        name: 'phenolic',
        quantity: objPhenolic,
        units: 'pcs of phenolic',
        pic: 'icon_phenolic.JPG',
        trendingPrice: '800',
        totalPrice:''
      },
      {
        id: 2,
        name: 'cement',
        quantity: objCement,
        units: 'bags of cement',
        pic: 'icon_cement.JPG',
        trendingPrice: '250',
        totalPrice:''
      },
      {
        id: 3,
        name: 'sand',
        quantity: objSand,
        units: 'cubic meter of sand',
        pic: 'icon_sand.JPG',
        trendingPrice: '1500',
        totalPrice:''
      },
      {
        id: 4,
        name: 'gravel',
        quantity: objGravel,
        units: 'cubic meter of gravel',
        pic: 'icon_gravel.JPG',
        trendingPrice: '1500',
        totalPrice:''
      },
      {
        id: 5,
        name: 'rebar 10mm',
        quantity: objTenMm,
        units: 'pcs of 6-m length 10mm',
        pic: 'icon_10mm.JPG',
        trendingPrice: '170',
        totalPrice:''
      },
      {
        id: 6,
        name: 'formworks2x4',
        quantity: objCocolumber2x4,
        units: 'pcs of 6-m 2x4 cocolumber',
        pic: 'icon_cocolumber2x4.JPG',
        trendingPrice: '120',
        totalPrice:'' 
      },
      {
        id: 6,
        name: 'tiewire',
        quantity: objTieWire,
        units: 'kg of tiewire',
        pic: 'icon_tiewire.JPG',
        trendingPrice: '75',
        totalPrice:''
      }

    ]
  }

   

  const costings = () => {
    var materialsCost = 0
    var factorLabor = 0.3
    var VAT = 0.12
    var contingency = 0.05
    var contractorsProfit = .15


    runSSlab.array.map(item => (
      materialsCost = materialsCost + (item.quantity*item.trendingPrice)
    )) 

    var particulars = {
      matCost: materialsCost,
      totalLabor: materialsCost * factorLabor,
      vatFromMaterials: materialsCost * VAT,
      contractorsProfit: materialsCost * contractorsProfit,
      materialsContingency: materialsCost * contingency
    } 
    
    return particulars
    
  }

  //destructure costings
  const {
      matCost,
      totalLabor,
      vatFromMaterials,
      contractorsProfit,
      materialsContingency
    } = costings()
 
  
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
      {/* Cost Per Square Meter:
      <input type='number' placeholder={costPerSquareMeter} onChange={showCostPerSquareMeter} value={costPerSquareMeter} /> */}
      <div className="enumerateMat">
            <div className='header'>Quantity</div>
            <div className='header'>&nbsp;</div>
            <div className='header'>Units</div>
            <div className='header'>Trending Price</div>
            <div className='header'>Total Price</div>
        
          {
            runSSlab.array.map(item => (
              <>
              <div className='cell'>{item.quantity}</div>
 
              <div className='cell'>
                
                <span className='icons'>

                <img src={require(`../images/${item.pic}`)} alt={item.units}  />
                </span>
                
              </div>

              <div className='cell'>{item.units}</div>
              <div className='cell'>
                <input type='text' placeholder={item.trendingPrice}  />
              </div>
              <div className='cell' style={{paddingLeft:'20px', width:'100%', textAlign: 'right'}}>
                {(item.quantity*item.trendingPrice).toFixed(2)}
              </div>
              </>
            ))
          }
         
      </div>
              
      {/* <div className='enumerateMat'>
              
        {/* <ul>
          <li>109 pcs of 6-m length 10mm deformed rebars</li>
          <li>{objPhenolic} pcs of phenolic board 1/2"</li>
          <li>{objCement} bags of Cement</li>
          <li>{objSand} cubic meters of Sand</li>
          <li>{objGravel} cubic meters of Gravel</li>
          <li>15 pcs of 6-linear meter of 2x2 support joist</li>
          <li>15 pcs of 6-linear meter 2x3 cocolumber</li>
          <li>8 kg of tie wire, #16</li>
        </ul> 

      </div>*/}
        
      
      </div>
      <div className='rowHandler'>
        Total Materials Cost:
        <div>{matCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
      </div>

      <div className='rowHandler'>
        Materials Contingency:
        <div>{materialsContingency.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
      </div>

      <div className='rowHandler'>
        Labor Cost:
        <div>{totalLabor.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
      </div>

      <div className='rowHandler'>
        Contractor's Profit:
        <div>{contractorsProfit.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
      </div>

      <div className='rowHandler'>
      12% VAT
        <div>{vatFromMaterials.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
      </div>
 
      <div className='rowHandler'>
      Total Project Cost:
        <div>
          { 
            
          'Php' + projectCost().toLocaleString(undefined, {minimumFractionDigits: 2})
 
          } 
        </div>
      </div>

    </div>
  )
} 
 
export default SuspendedSlab