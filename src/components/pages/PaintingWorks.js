import React, {useEffect, useState} from 'react'
import __FeedDimensions from '../__FeedDimensions'
import * as computePaintingWorks from '../computations/ComputePaintingWorks'
import Render, {EstimateTables, EnumerateTotals } from '../Render'

const PaintingWorks = ({
    length, setLength,
    width, setWidth,
    area, setArea,

  }) => {
     
    const giveArea = (e) => {
      let trueArea = '' 
      if (area) trueArea = area
      else trueArea = width * length

      return trueArea
    }
 
  const countPaintingWorks = () => {
    let theArea = giveArea()

    let objectPaintingWorks = {
      objSkimcoat: computePaintingWorks.countSkimCoat(theArea),
      objPrimer: computePaintingWorks.countPrimer(theArea),
      objTopCoat: computePaintingWorks.countTopCoat(theArea),
      objSandpaper: computePaintingWorks.countSandpaper(theArea),
      objRollerBrush: computePaintingWorks.countRollerBrush(theArea)
      
    }

    return objectPaintingWorks
  }

  const {
    objSkimcoat,
    objPrimer,
    objTopCoat,
    objSandpaper,
    objRollerBrush
  } = countPaintingWorks()

  const worksPainting = [
      {
        id: 1,
        name: 'skimcoat',
        quantity: objSkimcoat,
        units: 'bags (20kg) of skimcoat',
        pic: 'icon_skimcoat.jpg',
        trendingPrice: '500',
        totalPrice: ''
      },
      {
        id: 2,
        name: 'primer',
        quantity: objPrimer,
        units: 'pc(s) of 4-liter can primer',
        pic: 'icon_primer.jpg',
        trendingPrice: '620',
        totalPrice: ''
      },
      {
        id: 3,
        name: 'topcoat',
        quantity: objTopCoat,
        units: 'pc(s) of 4-liter can of topcoat',
        pic: 'icon_topcoat.jpg',
        trendingPrice: '679',
        totalPrice: ''
      },
      {
        id: 4,
        name: 'sandpaper',
        quantity: objSandpaper,
        units: 'pcs of sandpaper (bondpaper size)',
        pic: 'icon_sandpaper.jpg',
        trendingPrice: '19',
        totalPrice: ''
      },
      {
        id: 5,
        name: 'cotton',
        quantity: objRollerBrush,
        units: 'pcs of roller brush',
        pic: 'icon_roller_brush.jpg',
        trendingPrice: '60',
        totalPrice: ''
      }
    ]
   
  //https://www.freecodecamp.org/news/build-dynamic-forms-in-react/

 
  const [data, setData] = useState(worksPainting)

  useEffect(() => (
    setData(worksPainting)
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

export default PaintingWorks