import React, {useEffect, useState} from 'react'
import __FeedDimensions from '../__FeedDimensions'
import * as computeTiles from '../computations/ComputeTiles'
import Render, {EstimateTables, EnumerateTotals } from '../Render'
 
const FloorTiles = ({
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
 
  const countFloorTiles = () => {
    let theArea = giveArea()

    let objectTiles = {
      objTiles: computeTiles.countTiles(theArea),
      objAdhesive: computeTiles.countAdhesive(theArea),
      objGrout: computeTiles.countAdhesive(theArea)
      
    }

    return objectTiles
  }

  const {
    objTiles,
    objAdhesive,
    objGrout
  } = countFloorTiles()

  const worksFloorTiles = [
      {
        id: 1,
        name: 'tiles',
        quantity: objTiles,
        units: 'pieces of tiles (for 600mm x 600mm)',
        pic: 'icon_tiles.jpg',
        trendingPrice: '320',
        totalPrice: ''
      },
      {
        id: 2,
        name: 'adhesive',
        quantity: objAdhesive,
        units: 'kg of adhesive',
        pic: 'icon_adhesive.jpg',
        trendingPrice: '36',
        totalPrice: ''
      },
      {
        id: 3,
        name: 'grout',
        quantity: objGrout  ,
        units: 'kg of grout',
        pic: 'icon_10mm.jpg',
        trendingPrice: '48',
        totalPrice: ''
      } 
      
    ]
   
 
  const [data, setData] = useState(worksFloorTiles)

  useEffect(() => (
    setData(worksFloorTiles)
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

export default FloorTiles    