import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import '../styles2.css'

const ProjectsMenu = () => {
  const swipeBack = () => {
    setTimeout(() => {
      document.getElementById('switch').classList.toggle('active')
    }, 800)
     
  }
 
  return (
    <div>
      
        <ul className='links'>
            {/* onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} */}
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='floor_area'>Search by Location</NavLink></li>
            <li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='suspended_slab'>Search by Type</NavLink></li> 

        </ul> 
        
    </div>
  )
}

export default ProjectsMenu 