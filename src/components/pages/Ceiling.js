import React, {useEffect, useState} from 'react'
import __FeedDimensions from '../__FeedDimensions' 
import * as computeCeilingWorks from '../computations/ComputeCeiling'
import Render, {EstimateTables, EnumerateTotals } from '../Render'
 
 
const Ceiling = ({
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
        pic: 'icon_ficemboard.jpg',
        trendingPrice: '20',
        totalPrice: ''
      },
      {
        id: 1,
        name: 'carrying channel',
        quantity: objCarryingChannel,
        units: 'pieces of 5-m length carrying channel',
        pic: 'icon_carrying_channel.jpg',
        trendingPrice: '100',
        totalPrice: ''
      },
      {
        id: 3,
        name: 'metal furring',
        quantity: objMetalFurring,
        units: 'pieces of 5-m length metal furring',
        pic: 'icon_metal_furring.jpg',
        trendingPrice: '115',
        totalPrice: ''

      },
      {
        id: 4,
        name: 'wall angle',
        quantity: objWallAngle,
        units: 'pieces of 5-m length wall angle',
        pic: 'icon_wall_angle.jpg',
        trendingPrice: '45',
        totalPrice: ''
      },
      {
        id: 5,
        name: 'blindRivets',
        quantity: objRivets,
        units: 'pcs of blind rivets',
        pic: 'icon_blind_rivets.jpg',
        trendingPrice: '2',
        totalPrice: ''
      },
      {
        id: 5,
        name: 'mesh tape',
        quantity: objMeshTape,
        units: 'pcs of 100-m mesh tape',
        pic: 'icon_mesh_tape.jpg',
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
            EstimateTables(data, setData)
          }
          
        </div>
       
      </div>
       

      {
        EnumerateTotals (
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