import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import '../styles2.css'

const SideMenu = () => {
  const swipeBack = () => {
    setTimeout(() => {
      document.getElementById('switch').classList.toggle('active')
    }, 800)
     
  }
 
  return (
    <div>
      
        <ul className='links'>
            {/* onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} */}
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='floor_area'>Floor Area</NavLink></li>
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='suspended_slab'>Suspended Slab</NavLink></li>
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='slab_on_ground'>Slab on Ground</NavLink></li>
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='painting_works'>Painting Works</NavLink></li>
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='polycarbonate'>Polycarbonate Roof Canopy</NavLink></li>

            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='CHB_wall'>CHB Wall</NavLink></li>
           
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='roof'>Roof</NavLink></li>

            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='ceiling'>Ceiling</NavLink></li>

            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='wood_planks_flooring'>Wood Planks Flooring</NavLink></li>

            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='floor_tiles'>Floor Tiles</NavLink></li>
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='waterproofing'>Waterproofing</NavLink></li>
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='CHB_wall_fencing'>CHB Wall Fencing</NavLink></li>
            
            {/* this requires interactive 3D to illustrate better */}
            {/* 
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/footing'>Footing</NavLink></li>
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/concrete_beam'>Concrete Beam</NavLink></li>
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/concrete_column'>Concrete Column</NavLink></li> */}
 

        </ul> 
        
    </div>
  )
}

export default SideMenu 