import React, {useEffect, useState} from 'react'
import __FeedDimensions from './__FeedDimensions' 
import * as computeCeilingWorks from './computations/ComputeCeiling'
import Render, {EstimateTables, EnumerateTotals } from './Render'


 
const Ceiling = ({
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
 
  const countCeilingWorks = () => {
    let theArea = giveArea()

    let objectCeiling = {
      objFicemBoard: computeCeilingWorks.countFicemBoard(theArea),
      objCarryingChannel: computeCeilingWorks.countCarryingChannel(theArea),
      objMetalFurring: computeCeilingWorks.countMetalFurring(theArea),
      objWallAngle: computeCeilingWorks.countWallAngle(theArea),
      objRivets: computeCeilingWorks.countRivets(theArea),
      objMeshTape: computeCeilingWorks.countMeshTape(theArea)
    }

    return objectCeiling
  }

  const {
    objFicemBoard,
    objCarryingChannel,
    objMetalFurring,
    objWallAngle,
    objRivets,
    objMeshTape
  } = countCeilingWorks()

  const worksCeiling = [
      {
        id: 1,
        name: 'ficem board',
        quantity: objFicemBoard,
        units: 'pieces ficem board',
        pic: 'icon_skimcoat.JPG',
        trendingPrice: '20',
        totalPrice: ''
      },
      {
        id: 1,
        name: 'carrying channel',
        quantity: objCarryingChannel,
        units: 'pieces of 5-m length carrying channel',
        pic: 'icon_skimcoat.JPG',
        trendingPrice: '100',
        totalPrice: ''
      },
      {
        id: 3,
        name: 'metal furring',
        quantity: objMetalFurring,
        units: 'pieces of 5-m length metal furring',
        pic: 'icon_cement.JPG',
        trendingPrice: '115',
        totalPrice: ''

      },
      {
        id: 4,
        name: 'wall angle',
        quantity: objWallAngle,
        units: 'pieces of 5-m length wall angle',
        pic: 'icon_sand.JPG',
        trendingPrice: '45',
        totalPrice: ''
      },
      {
        id: 5,
        name: 'blindRivets',
        quantity: objRivets,
        units: 'pcs of blind rivets',
        pic: 'icon_cement.JPG',
        trendingPrice: '2',
        totalPrice: ''
      },
      {
        id: 5,
        name: 'mesh tape',
        quantity: objMeshTape,
        units: 'pcs of 100-m mesh tape',
        pic: 'icon_sand.JPG',
        trendingPrice: '150',
        totalPrice: ''
      }
      
    ]
   
  //https://www.freecodecamp.org/news/build-dynamic-forms-in-react/

 
  const [data, setData] = useState(worksCeiling)

  useEffect(() => (
    setData(worksCeiling)
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
            
            // data.map((item, index) => (
            //   <> 
                 
            //     <div className="cell" >
            //       <span className="icons">
            //         <img src={require(`../images/${item.pic}`)} alt={item.units} />
            //       </span>
            //     </div>  
            //     <div className="cell">{(item.quantity).toFixed(2)}</div>
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
      {/* <div className="rowHandler">
       Total Materials Cost:
        <div>
          <span style={{fontWeight:700}}>
            {'Php'+ getMaterialCost.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="rowHandler2">
        <div>
          <input type='checkbox' id='contingency' />
          <label for='contingency' >Materials Contingency:</label>
        </div>
        <div>{getContingency.toFixed(2)}</div>
        
      </div>
      <div className="rowHandler2">
        <div>
          <input type='checkbox' id='laborcost' />
          <label for='laborcost' >Labor Cost:</label>
        </div>
        <div>{getLabor.toFixed(2)}</div>
      </div>
      <div className="rowHandler2">
      <div>
          <input type='checkbox' id='contractorsprofit' />
          <label for='contractorsprofit' >Contractor's Profit:</label>
        </div>
        <div>{getContractorsProfit.toFixed(2)}</div>
      </div>
      <div className="rowHandler2">
        <div>
          <input type='checkbox' id='vat' />
          <label for='vat' >12% VAT:</label>
        </div>
        <div>{getVAT.toFixed(2)}</div>
      </div>
      <div className="rowHandler">
        Total Project Cost:
        <div>
          <span style={{fontWeight:700}}>
            {'Php'+ getTotalProjectCost()}
          </span>
        </div>
      </div> */}

      {
      EnumerateTotals(
        getMaterialCost,
        getLabor,
        getVAT,
        getContingency,
        getContractorsProfit,
        getTotalProjectCost()
      )
      }
       
     
    </div>

    
  )
}

export default Ceiling    