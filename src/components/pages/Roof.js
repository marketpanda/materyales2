import React, {useEffect, useState} from 'react'
import __FeedDimensions from '../__FeedDimensions'
import * as computeRoof from '../computations/ComputeRoof'
import Render, {EstimateTables, EnumerateTotals } from '../Render'
 
const Roof = ({
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
 
  const countRoofingWorks = () => {
    let theArea = giveArea()

    let objectRoof = {
      objRoof: computeRoof.roof(theArea),
      objRafters: computeRoof.rafters(theArea),
      objPurlins: computeRoof.purlins(theArea),
      objGutter: computeRoof.gutter(theArea),
      objRidgeRoll: computeRoof.ridgeRoll(theArea),
      objSideGutter: computeRoof.sideGutter(theArea),
      objRoofNails: computeRoof.roofNails(theArea) 
    }

    return objectRoof
  }

  const {
    objRoof,
    objRafters,
    objPurlins,
    objGutter,
    objRidgeRoll,
    objSideGutter,
    objRoofNails
  } = countRoofingWorks()

  const worksRoofing = [
      {
        id: 1,
        name: 'roof',
        quantity: objRoof,
        units: 'sheets of 6-meter length roof',
        pic: 'icon_roof.jpg',
        trendingPrice: '388',
        totalPrice: ''
      },
      {
        id: 2,
        name: 'rafters',
        quantity: objRafters,
        units: 'pcs of 6-m 2x4 tubular rafter',
        pic: 'icon_10mm.jpg',
        trendingPrice: '2000',
        totalPrice: ''
      },
      {
        id: 3,
        name: 'purlins',
        quantity: objPurlins,
        units: 'pcs of 6-m 2x3 purlins',
        pic: 'icon_purlins.jpg',
        trendingPrice: '1000',
        totalPrice: ''

      },
      {
        id: 4,
        name: 'gutter',
        quantity: objGutter,
        units: 'meters of 24-inch plain sheet',
        pic: 'icon_sand.jpg',
        trendingPrice: '450',
        totalPrice: ''
      },
      {
        id: 5,
        name: 'ridgeroll',
        quantity: objRidgeRoll,
        units: 'meters of 48-inch plain sheet',
        pic: 'icon_cement.jpg',
        trendingPrice: '700',
        totalPrice: ''
      },
      {
        id: 6,
        name: 'sidegutter',
        quantity: objSideGutter,
        units: 'meters of 24-inch plain sheet',
        pic: 'icon_sand.jpg',
        trendingPrice: '300',
        totalPrice: ''
      },
      {
        id: 7,
        name: 'roofnails',
        quantity: objRoofNails,
        units: 'kgs of roof nails',
        pic: 'icon_nails.jpg',
        trendingPrice: '3',
        totalPrice: ''
      }
      
    ]
   
  //https://www.freecodecamp.org/news/build-dynamic-forms-in-react/

 
  const [data, setData] = useState(worksRoofing)

  useEffect(() => (
    setData(worksRoofing)
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

export default Roof    