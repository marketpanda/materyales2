import React, {useState} from 'react'
import * as computeSSlab from '../computations/ComputeSuspendedSlab'
import Render, {EstimateTables, EnumerateTotals } from '../Render'
 
  
const SuspendedSlab = () => {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [area, setArea] = useState('')
 
  
  
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

   

  const runSSlab = {
    array: [
      {
        id: 1,
        name: 'phenolic',
        quantity: objPhenolic,
        units: 'pcs of phenolic',
        pic: 'icon_phenolic.jpg',
        trendingPrice: '800',
        totalPrice:''
      },
      {
        id: 2,
        name: 'cement',
        quantity: objCement,
        units: 'bags of cement',
        pic: 'icon_cement.jpg',
        trendingPrice: '250',
        totalPrice:''
      },
      {
        id: 3,
        name: 'sand',
        quantity: objSand,
        units: 'cubic meter of sand',
        pic: 'icon_sand.jpg',
        trendingPrice: '1500',
        totalPrice:''
      },
      {
        id: 4,
        name: 'gravel',
        quantity: objGravel,
        units: 'cubic meter of gravel',
        pic: 'icon_gravel.jpg',
        trendingPrice: '1500',
        totalPrice:''
      },
      {
        id: 5,
        name: 'rebar 10mm',
        quantity: objTenMm,
        units: 'pcs of 6-m length 10mm',
        pic: 'icon_10mm.jpg',
        trendingPrice: '170',
        totalPrice:''
      },
      {
        id: 6,
        name: 'formworks2x4',
        quantity: objCocolumber2x4,
        units: 'pcs of 6-m 2x4 cocolumber',
        pic: 'icon_cocolumber2x4.jpg',
        trendingPrice: '120',
        totalPrice:'' 
      },
      {
        id: 6,
        name: 'tiewire',
        quantity: objTieWire,
        units: 'kg of tiewire',
        pic: 'icon_tiewire.jpg',
        trendingPrice: '75',
        totalPrice:''
      }

    ]
  }
 

  const costings = () => {
    let materialsCost = 0
    let factorLabor = 0.3
    let VAT = 0.12
    let contingency = 0.05
    let contractorsProfit = .15


    runSSlab.array.map(item => (
      materialsCost = materialsCost + (item.quantity*item.trendingPrice)
    )) 

    let particulars = {
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
            <div className='header'>&nbsp;</div>
            <div className='header'><span >Quantity</span></div>
            
            <div className='header'>Units</div>
            <div className='header'>Trending Price</div>
            <div className='header'>Total Price</div>
        
          {
            runSSlab.array.map(item => (
              <>
              
              <div className='cell'>
                
                <span className='icons'>

                <img src={require(`../images/${item.pic}`)} alt={item.units}  />
                </span>
                
              </div>
              <div className='cell'>{item.quantity}</div>

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
              
          
      </div>
      <div className='rowHandler'>
        Total Materials Cost:
        <div>
          <span style={{fontWeight:700}}>
          {matCost.toLocaleString(undefined, {minimumFractionDigits: 2})}
          </span>
        </div>
      </div>

      <div className='rowHandler2'>
        <div><input type='checkbox' id='mat' className='test2' style={{marginRight
        : '10px'}} />
        <label for='mat'>Materials Contingency:</label>
        </div>
        <div>{materialsContingency.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
      </div>

      <div className='rowHandler2'>
        Labor Cost:
        <div>{totalLabor.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
      </div>

      <div className='rowHandler2'>
        Contractor's Profit:
        <div>{contractorsProfit.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
      </div>

      <div className='rowHandler2'>
      12% VAT
        <div>{vatFromMaterials.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
      </div>
 
      <div className='rowHandler'>
      Total Project Cost:
        <div>
          <span style={{fontWeight:700}}>
            { 
              
            'Php' + projectCost().toLocaleString(undefined, {minimumFractionDigits: 2})
  
            } 
          </span>
        </div>
      </div>

    </div>
  )
} 
 
export default SuspendedSlab