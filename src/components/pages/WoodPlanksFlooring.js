import React, {useEffect, useState} from 'react'
import __FeedDimensions from '../__FeedDimensions'
import * as computePlanks from '../computations/ComputeWoodPlanks'
import Render, {EstimateTables, EnumerateTotals } from '../Render'
 
const WoodPlanksFlooring = ({
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
 
  const countWoodPlanks = () => {
    let theArea = giveArea()

    let objectWoodPlanks = {
      objPlanks: computePlanks.countPlanks(theArea),
      objAdhesive: computePlanks.countAdhesive(theArea) 
      
    }

    return objectWoodPlanks
  }

  const {
    objPlanks,
    objAdhesive
     
  } = countWoodPlanks()

  const worksWoodPlanks = [
      {
        id: 1,
        name: 'planks',
        quantity: objPlanks,
        units: 'pcs of planks (150x1200mm)',
        pic: 'icon_wood_planks.jpg',
        trendingPrice: '330',
        totalPrice: ''
      },
      {
        id: 2,
        name: 'adhesive',
        quantity: objAdhesive,
        units: 'gallons of adhesive',
        pic: 'icon_adhesive.jpg',
        trendingPrice: '833',
        totalPrice: ''
      } 
      
    ]
 
  const [data, setData] = useState(worksWoodPlanks)

  useEffect(() => (
    setData(worksWoodPlanks)
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
            
            // data.map((item, index) => (
            //   <> 
                 
            //     <div className="cell" >
            //       <span className="icons">
            //         <img src={require(`../images/${item.pic}`)} alt={item.units} />
            //       </span>
            //     </div>  
            //     <div className="cell">{item.quantity}</div>
            //     <div className="cell">{item.units}</div>
            //     <div className="cell">
                  
            //       <input key={index} type='number' id={item.name} name={item.name} value={(data[index].trendingPrice)} onChange={event => changeTrendingPrice(index, event)} />
                 
            //     </div>
            //     <div className="cell">{(item.quantity*item.trendingPrice).toFixed(2)}</div>
                
            //   </>
            // ))
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

export default WoodPlanksFlooring    


