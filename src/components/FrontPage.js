import React from 'react'
import SideMenu from './SideMenu'

import { Outlet } from 'react-router-dom'
import RightMenu_1 from '../RightMenu_1'


const FrontPage = () => {

  const show = () => {
    document.getElementById('switch').classList.toggle('active')
  }



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

export default FrontPage