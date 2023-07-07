import React, {useEffect, useState} from 'react'
import __FeedDimensions from '../__FeedDimensions'
import * as computeCHBWall from '../computations/ComputeCHBWall'
import Render, {EstimateTables, EnumerateTotals } from '../Render'
 
const CHBWall = ({
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

    let objectCHBWall = {
      objCHB: computeCHBWall.countCHB(theArea),
      objDowels: computeCHBWall.countDowels(theArea),
      objMortarCement: computeCHBWall.countMortarCement(theArea),
      objMortarSand: computeCHBWall.countMortarSand(theArea),
      objPlasterCement: computeCHBWall.countPlasterCement(theArea),
      objPlasterSand: computeCHBWall.countPlasterSand(theArea)
      
    }

    return objectCHBWall
  }

  const {
    objCHB,
    objDowels,
    objMortarCement,
    objMortarSand,
    objPlasterCement,
    objPlasterSand
  } = countPaintingWorks()

  const worksCHBWall = [
      {
        id: 1,
        name: 'CHB',
        quantity: objCHB,
        units: 'pieces of concrete hollow blocks',
        pic: 'icon_hollow_blocks.jpg',
        trendingPrice: '20',
        totalPrice: ''
      },
      {
        id: 2,
        name: 'dowels',
        quantity: objDowels,
        units: 'pcs of 6-m 10mm diameter rebar',
        pic: 'icon_10mm.jpg',
        trendingPrice: '210',
        totalPrice: ''
      },
      {
        id: 3,
        name: 'mortarCement',
        quantity: objMortarCement,
        units: 'bags of cement for mortar',
        pic: 'icon_mortar.jpg',
        trendingPrice: '230',
        totalPrice: ''

      },
      {
        id: 4,
        name: 'mortarSand',
        quantity: objMortarSand,
        units: 'cubic meter of sand for mortar',
        pic: 'icon_sand.jpg',
        trendingPrice: '1230',
        totalPrice: ''
      },
      {
        id: 5,
        name: 'plasterCement',
        quantity: objPlasterCement,
        units: 'bags of cement for plaster',
        pic: 'icon_plaster.jpg',
        trendingPrice: '230',
        totalPrice: ''
      },
      {
        id: 5,
        name: 'plasterSand',
        quantity: objPlasterSand,
        units: 'cubic meter of sand for plaster',
        pic: 'icon_sand.jpg',
        trendingPrice: '1230',
        totalPrice: ''
      }
      
    ]
   
  //https://www.freecodecamp.org/news/build-dynamic-forms-in-react/

 
  const [data, setData] = useState(worksCHBWall)

  useEffect(() => (
    setData(worksCHBWall)
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

export default CHBWall    