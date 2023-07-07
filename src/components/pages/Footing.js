import React, {useEffect, useState} from 'react'
import __FeedDimensions from '../__FeedDimensions'
import * as computeFooting from '../computations/ComputeFooting'
import Render, {EstimateTables, EnumerateTotals } from '../Render'
 
const Footing = ({
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
 
  const countFooting = () => {
    let theArea = giveArea()

    let objectFooting = {
      objCement: computeFooting.countCement(theArea),
      objSand: computeFooting.countSand(theArea),
      objGravel: computeFooting.countGravel(theArea),
      obj16mm: computeFooting.count16mm(theArea),
      obj10mm: computeFooting.countTenMm(theArea),
      objTieWire: computeFooting.countTieWire(theArea),
      objCocolumber: computeFooting.countCocolumber2x3(theArea),
      objPhenolic: computeFooting.countPhenolic(theArea) 
      
    }

    return objectFooting
  }

  const {
    objCement,
    objSand,
    objGravel,
    obj16mm,
    obj10mm,
    objTieWire,
    objCocolumber,
    objPhenolic 
  } = countFooting()

  const worksFooting = [
      {
        id: 1,
        name: 'cement',
        quantity: objCement,
        units: 'bags of cement',
        pic: 'icon_skimcoat.jpg',
        trendingPrice: '230',
        totalPrice: ''
      },
      {
        id: 2,
        name: 'sand',
        quantity: objSand,
        units: 'cubic meters of sand',
        pic: 'icon_10mm.jpg',
        trendingPrice: '1300',
        totalPrice: ''
      },
      {
        id: 3,
        name: 'gravel',
        quantity: objGravel,
        units: 'cubic meters of gravel',
        pic: 'icon_cement.jpg',
        trendingPrice: '1300',
        totalPrice: ''

      },
      {
        id: 4,
        name: '16mm',
        quantity: obj16mm,
        units: 'pcs of 6-m length 16mm',
        pic: 'icon_sand.jpg',
        trendingPrice: '500',
        totalPrice: ''
      },
      {
        id: 5,
        name: '10mm',
        quantity: obj10mm,
        units: 'pcs of 6-m length 10mm',
        pic: 'icon_cement.jpg',
        trendingPrice: '150',
        totalPrice: ''
      },
      {
        id: 6,
        name: 'tiewire',
        quantity: objTieWire,
        units: 'kg of tiewire',
        pic: 'icon_sand.jpg',
        trendingPrice: '80',
        totalPrice: ''
      },
      {
        id: 7,
        name: 'cocolumber',
        quantity: objCocolumber,
        units: 'pcs of 2x3 cocolumber',
        pic: 'icon_sand.jpg',
        trendingPrice: '110',
        totalPrice: ''
      },
      {
        id: 8,
        name: 'phenolic',
        quantity: objPhenolic,
        units: 'pcs of phenolic',
        pic: 'icon_sand.jpg',
        trendingPrice: '800',
        totalPrice: ''
      },
      
    ]
   
  //https://www.freecodecamp.org/news/build-dynamic-forms-in-react/

 
  const [data, setData] = useState(worksFooting)

  useEffect(() => (
    setData(worksFooting)
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

export default Footing      