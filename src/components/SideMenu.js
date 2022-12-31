import React, {useState} from 'react'
import {Link } from 'react-router-dom'
 

const SideMenu = () => {
     
  return (
    <div>
        <ul className='links'>
            <li><Link to='/floor_area'>Floor Area</Link></li>
            <li><Link to='/suspended_slab'>Suspended Slab</Link></li>
            <li><Link to='/slab_on_ground'>Slab on Ground</Link></li>
            <li><Link to='/painting_works'>Painting Works</Link></li>
            <li><Link to='/painting_works'>Polycarbonate Roof Canopy</Link></li>
        </ul> 
    </div>
  )
}

export default SideMenu