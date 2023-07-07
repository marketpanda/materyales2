import React from 'react'

const Render = () => {
  return (
    <div>test</div>
  )
}


 
export const EstimateTables = (theData, setData) => {

    const changeTrendingPrice = (index, event) => {
    
        let newData = [...theData]
        
        newData[index].trendingPrice = event.target.value
        newData[index].totalPrice = newData[index].trendingPrice*newData[index].quantity
        setData(newData)
           
    }

    
     


    return (
      
        theData.map((item, index) => (
        <>
            <div className="cell" >
                <span className="icons">
                  
                  <img src={require(`./images/${item.pic}`)} alt={item.units} />
                </span>
            </div> 
            <div className="cell">{(item.quantity).toFixed(2)}</div>
            <div className="cell">
              {item.units} 
            </div>
            
            <div className="cell">
                    
              <input key={index} type='number' id={item.name} name={item.name} value={(theData[index].trendingPrice)} onChange={event => changeTrendingPrice(index, event)} />
              
              </div>

            <div className="cell">{(item.quantity*item.trendingPrice).toFixed(2)}</div>
            
        </>
        ))
    )
        
}

export const EnumerateTotals = (
        materialCost,
        labor,
        vat,
        contingency,
        contractorsProfit,
        totalProjectCost
    ) => {
 
    return (
        <>

        <div className="rowHandler">
       Total Materials Cost:
        <div>
          <span style={{fontWeight:700}}>
            {'Php'+ materialCost.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="rowHandler2">
        <div>
          <input type='checkbox' id='contingency' />
          <label for='contingency' >Materials Contingency:</label>
        </div>
        <div>{contingency.toFixed(2)}</div>
        
      </div>
      <div className="rowHandler2">
        <div>
          <input type='checkbox' id='laborcost' />
          <label for='laborcost' >Labor Cost:</label>
        </div>
        <div>{labor.toFixed(2)}</div>
      </div>
      <div className="rowHandler2">
      <div>
          <input type='checkbox' id='contractorsprofit' />
          <label for='contractorsprofit' >Contractor's Profit:</label>
        </div>
        <div>{contractorsProfit.toFixed(2)}</div>
      </div>
      <div className="rowHandler2">
        <div>
          <input type='checkbox' id='vat' />
          <label for='vat' >12% VAT:</label>
        </div>
        <div>{vat.toFixed(2)}</div>
      </div>
      <div className="rowHandler">
        Total Project Cost:
        <div>
          <span style={{fontWeight:700}}>
            {'Php'+ totalProjectCost}
          </span>
        </div>
      </div>
      </>


    )
}

export default Render