import React, {useState} from 'react'
import * as computeSlabOnGrade from '../computations/ComputeSlabOnGround'
 

const SlabonGround = () => {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [area, setArea] = useState('')

  const showLength = (e) => {
    e.preventDefault();
    setLength(e.target.value)
    setArea('')
  }

  const showWidth = (e) => {
    e.preventDefault();
    setWidth(e.target.value)
    setArea('')
  }

  const showArea = (e) => {
    e.preventDefault();
    setArea(e.target.value)

    //resets length
    setLength('')

    //resets width
    setWidth('')
  }


  const giveArea = (e) => {
    var trueArea = ''
    if (area) {
      trueArea = area
    } else {
      trueArea = length*width
    }
    return trueArea
  }

  const SlabOnGroundDetails = () => {
    let theArea = giveArea()
    let slabThickness = 0.15
    let theVolume = theArea * slabThickness
    let theLength = length
    let theWidth = width

    let objectSlabOnGrade = {
      objPolyethylene: computeSlabOnGrade.countPolyethylene(theArea),
      objCement: computeSlabOnGrade.countCement(theVolume),
      objSand: computeSlabOnGrade.countSand(theVolume),
      objGravel: computeSlabOnGrade.countGravel(theVolume),
      objTenMm: computeSlabOnGrade.countTenMmSlabOnGrade(theArea),
      objTieWire: computeSlabOnGrade.countTieWire(theArea)
    }

    return objectSlabOnGrade

  }

  const {

    objPolyethylene,
    objCement,
    objSand,
    objGravel,
    objTenMm,
    objTieWire

  } = SlabOnGroundDetails()
 

  const templateSlabOnGround = {
    array: [
      {
        id: 1, 
        name: 'polyethylene',
        quantity: objPolyethylene,
        units: 'sqm of polyethylene',
        pic: 'icon_polyethylene.jpg',
        trendingPrice: '100',
        totalPrice: ''
      },
      {
        //cement
        id: 2,
        name: 'cement',
        quantity: objCement,
        units: 'bags of cement',
        pic: 'icon_cement.jpg',
        trendingPrice: '230',
        totalPrice: ''
      },
      {
        //sand
        id: 3,
        name: 'sand',
        quantity: objSand,
        units: 'cubic meter of sand',
        pic: 'icon_sand.jpg',
        trendingPrice: '1600',
        totalPrice: ''
      },
      {
        //gravel
        id: 4,
        name: 'gravel',
        quantity: objGravel,
        units: 'cubic meters of gravel',
        pic: 'icon_gravel.jpg',
        trendingPrice: '1600',
        totalPrice: ''
      },

      { //10mm
        id: 5,
        name: 'tenmm',
        quantity: objTenMm,
        units: 'pcs of 6-m 10mm rebar',
        pic: 'icon_10mm.jpg',
        trendingPrice: '170',
        totalPrice: ''

      },
      
      {
        //tiewire
        id: 6,
        name: 'tiewire',
        quantity: objTieWire,
        units: 'kg of tiewire',
        pic: 'icon_tiewire.jpg',
        trendingPrice: '50',
        totalPrice: ''
      } 
    ]
  }

  const costings = () => {
    let materialCost = 0
    let factorLabor = 0.3
    let VAT = 0.12
    let contingency = 0.05
    let contractorsProfit = .15

    templateSlabOnGround.array.map(item => (
      materialCost = materialCost + (item.quantity * item.trendingPrice)
    ))

    let particulars = {
      matCost: materialCost,
      totalLabor: materialCost * factorLabor,
      vatFromMaterials: materialCost * VAT,
      contractorsProfit: materialCost * contractorsProfit,
      materialsContingency: materialCost * contingency
    }

   return particulars 
 
  }

  const {
    matCost,
    totalLabor,
    vatFromMaterials,
    contractorsProfit,
    materialsContingency
  } = costings()

  const projectCost = () => {
    let t = 0
    t = matCost +
    totalLabor +
    vatFromMaterials +
    contractorsProfit +
    materialsContingency

    return t
  }

  const formatTwoDigits = (e) => {
    return e.toLocaleString(undefined, {minimumFractionDigits: 2})
  }

   
  return (
    <div className="app"> 
      <div className="rowHandler">
        Length: <input type='number' placeholder='Type length here' onChange={showLength} value={length} />
      </div>
      <div className="rowHandler">
        Width: <input type='number' placeholder='Type width here' onChange={showWidth} value={width} />
      </div>
      <div className="rowHandler">
        Area: <input type='number' placeholder={giveArea()} onChange={showArea} value={area} autoFocus />
      </div>
      <div><hr /></div>

      <div className="rowHandler">
        <div className="enumerateMat">
          <div className="header">
            &nbsp;
          </div> 
          <div className="header">Quantity</div>
          <div className="header">Units</div>
          <div className="header">Trending Price</div>
          <div className="header">Total Price</div>
        

        {
          templateSlabOnGround.array.map(item => (
            <>
              <div className='cell'>
                <span className='icons'>
                <img src={require(`../images/${item.pic}`)} alt={item.units} />
                </span>
                </div>
              <div className="cell">{(item.quantity)}</div>
              <div className="cell">{item.units}</div>
              <div className="cell">
                <input type='number' placeholder={item.trendingPrice} />
              </div>
              <div className="cell"  style={{paddingLeft:'20px', width:'100%', textAlign: 'right'}}>{(item.quantity * item.trendingPrice).toFixed(2)}</div>
            </>

          )
          )
        }
        </div>
      </div>
      <div className="rowHandler">
        Total Materials Cost: 
        <div><span>{formatTwoDigits(matCost)}</span></div>
      </div>

      <div className="rowHandler2">
      Materials Contingency:
        <div><span>{formatTwoDigits(materialsContingency)}</span></div>
        
      </div>

      <div className="rowHandler2">
        Labor
        <div><span>{formatTwoDigits(totalLabor)}</span></div>
      </div>
      <div className="rowHandler2">
      
        Contractor Profit:
        <div><span>{formatTwoDigits(contractorsProfit)}</span></div>
      
      </div>
      <div className="rowHandler2">
        12% VAT
        <div><span>{formatTwoDigits(vatFromMaterials)}</span></div>
      </div>
      <div className="rowHandler">  
        Total Project Cost
        <div><span>{formatTwoDigits(projectCost())}</span></div>
      </div>


    </div>
  )
}

export default SlabonGround