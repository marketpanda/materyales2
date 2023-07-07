import React from 'react'
import SideMenu from './SideMenu'
import RightMenu_1 from '../RightMenu_1'
import '../styles2.css' 
import { Outlet } from 'react-router-dom'

const show = () => {
  document.getElementById('switch').classList.toggle('active')
}
  

const Estimates = () => {
  return (
     
      <div className='typicalWindow'>
        <div className="sidebar-left">
         
          <div  id='toggleMenu' className="toggle" onClick={() => show()}> 
              <label className="menu-icon">
                  <i className="fas fa-bars"></i>
              </label> 
          </div>
          <nav id="switch">
            <SideMenu /> 
          </nav> 
        </div>
        <div className='mainWindow'>
          {/* <div className='test'>Contents</div>
           */}
        <Outlet /> 

        </div>
        <div className='showCase'>
        <RightMenu_1 />


        </div>
        

      </div> 
    
  )
}

export default Estimates