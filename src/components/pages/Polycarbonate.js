import React, {useEffect, useState} from 'react'
import __FeedDimensions from '../__FeedDimensions'
import * as computePolyCarbonate from '../computations/ComputePolycarbonateRoofing'
import Render, {EstimateTables, EnumerateTotals } from '../Render'
 
const Polycarbonate = ({
    length, setLength,
    width, setWidth,
    area, setArea,

  }) => {
     
    const giveArea = (e) => {
      let trueArea = '' 
      if (area) trueArea = parseInt(area)
      else trueArea = width * length

      return trueArea
    }
 
  const countPolycarbonateRoof = () => {
    let theArea = giveArea()

    let objectPolycarbonateRoof = {
      objPolyCarbonate: computePolyCarbonate.polycarbonate(theArea),
      objPrimaryFrame: computePolyCarbonate.primaryFrame(length, width, area),
      objSecondaryFrame: computePolyCarbonate.secondaryFrame(length, width, area),
      objScrew: computePolyCarbonate.screw(theArea),
      objEpoxyPrimer: computePolyCarbonate.epoxyPrimer(theArea),
      objPaint: computePolyCarbonate.paint(theArea),
      objWeldingRods: computePolyCarbonate.weldingRods(theArea)      
    }

    return objectPolycarbonateRoof
  }

  const {
    objPolyCarbonate,
    objPrimaryFrame,
    objSecondaryFrame,
    objScrew,
    objEpoxyPrimer,
    objPaint,
    objWeldingRods
  } = countPolycarbonateRoof()

  const worksPolycarbonate = [
      {
        id: 1,
        name: 'polycarbonate',
        quantity: objPolyCarbonate,
        units: 'pcs of 6mm thk 4x8 feet polycarbonate sheet',
        pic: 'icon_polycarbonate.jpg',
        trendingPrice: '1900',
        totalPrice: ''
      },
      {
        id: 2,
        name: 'primary framing',
        quantity: objPrimaryFrame,
        units: 'meters of 2x3 framing (perimeter)',
        pic: 'icon_framing_tubular.jpg',
        trendingPrice: '800',
        totalPrice: ''
      },
      {
        id: 3,
        name: 'secondary framing',
        quantity: objSecondaryFrame,
        units: 'meters of 1x2 framing (joists/inside framing)',
        pic: 'icon_framing_tubular.jpg',
        trendingPrice: '500',
        totalPrice: ''
      },
      {
        id: 4,
        name: 'screw',
        quantity: (objPrimaryFrame + objSecondaryFrame) / 0.3,
        units: 'pcs of screw',
        pic: 'icon_screws.jpg',
        trendingPrice: '2.50',
        totalPrice: ''
      },
      {
        id: 5,
        name: 'epoxy primer', 
        quantity: objEpoxyPrimer,
        units: 'liters of epoxy primer',
        pic: 'icon_epoxy_primer.jpg',
        trendingPrice: '270',
        totalPrice: ''
      },
      {
        id: 6,
        name: 'paint',
        quantity: objPaint,
        units: 'liters of metal paint',
        pic: 'icon_roller_brush.jpg',
        trendingPrice: '170',
        totalPrice: ''
      },
      {
        id: 7,
        name: 'welding_rod',
        quantity: objWeldingRods,
        units: 'pcs of welding rod',
        pic: 'icon_welding_rod.jpg',
        trendingPrice: '50',
        totalPrice: ''
      }
    ]
   
  
  const [data, setData] = useState(worksPolycarbonate)

  useEffect(() => (
    setData(worksPolycarbonate)
  ), [length, area, width])

    
  const matCost = () => {
    let materialsTotalCost = 0

    data.map(item => {
        
        let x = parseFloat(item.quantity)
        let y = parseFloat(item.trendingPrice)
  
        materialsTotalCost = materialsTotalCost + (x * y)
        
    })

    return materialsTotalCost

  }

  const constants = {
    labor: 0.3,
    VAT: 0.12,
    contingency: 0.05,
    contractorsProfit: 0.15
  }

  const costings = (materialCost = matCost()) => {
     
    let computeCostings = {
      getMaterialCost: materialCost,
      getLabor: constants.labor * materialCost,
      getVAT: constants.VAT * materialCost,
      getContingency: constants.contingency * materialCost,
      getContractorsProfit: constants.contractorsProfit * materialCost,
    }

    return computeCostings
  }
 
  const {
    getMaterialCost,
    getLabor,
    getVAT,
    getContingency,
    getContractorsProfit,
    
  } = costings()

  const getTotalProjectCost = () => {
    let sum = 0
    for (let num of Object.values(costings())) {
      sum += parseFloat(num)
    }
    
    return sum.toFixed(2)
  }

  const changeTrendingPrice = (index, event) => {
    
    let newData = [...data]
    
    newData[index].trendingPrice = event.target.value
    newData[index].totalPrice = newData[index].trendingPrice*newData[index].quantity
    setData(newData)
       
  }   
   
  return (
    <div className='app'>
      <__FeedDimensions
        length={length}
        setLength={setLength}
        width={width}
        setWidth={setWidth}
        area={area}
        setArea={setArea}
      />
        
      <div className="rowHandler">
        <div className="enumerateMat">
          <div className="header">
            &nbsp;</div>
          <div className="header">Quantity</div>
          <div className="header">Units</div>
          <div className="header">Trending Price</div>
          <div className="header">Total Price</div>

          {
            
            EstimateTables(data, setData)

          }
 

        </div>
      </div>
      <div className="rowHandler">
        Total Materials Cost:
        <div>
          <span style={{fontWeight:700}}>
            {'Php'+ getMaterialCost.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="rowHandler2">
        Materials Contingency:
        <div>{getContingency.toFixed(2)}</div>
      </div>
      <div className="rowHandler2">
        Labor Cost:
        <div>{getLabor.toFixed(2)}</div>
      </div>
      <div className="rowHandler2">
        Contractor's Profit:
        <div>{getContractorsProfit.toFixed(2)}</div>
      </div>
      <div className="rowHandler2">
        12% VAT:
        <div>{getVAT.toFixed(2)}</div>
      </div>
      <div className="rowHandler">
        Total Project Cost:
        <div>
          <span style={{fontWeight:700}}>
            {'Php'+ getTotalProjectCost()}
          </span>
        </div>
      </div>
       
     
    </div>
  )
}

export default Polycarbonate