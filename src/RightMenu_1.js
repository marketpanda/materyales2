import React, {useState} from 'react'
import { guides } from './components/Tips'

const RightMenu_1 = () => {

    const [guideMessage, setGuideMessage] = useState('')

    const provideMessage = (e) => {
        const selected = e.target.value
        setGuideMessage(selected)
    }   
  return (
    <>
    
        <div>
            Browse materials for guides and offers
        </div>
                        
        <div>  
            <select value={guideMessage} onChange={provideMessage} name='materials' id='materialsShowcase' >
                <option>-------</option>
                { 
                    Object.keys(guides).map((optionValue) => (
                            <option value={guides[optionValue].value} key={optionValue}>{guides[optionValue].title}</option>
                        )
                    ) 
                } 
            </select>
        
        </div> 

        <div>
            {guideMessage}
        </div>
    
    </>
  )
}

export default RightMenu_1