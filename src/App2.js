import React from "react";
import './styles2.css' 
import './styles3.css'
import SideMenu from "./components/SideMenu";
import {Routes, Route} from 'react-router-dom'
import FloorArea from "./components/pages/FloorArea";
import SuspendedSlab from "./components/pages/SuspendedSlab";
import SlabonGround from "./components/pages/SlabonGround";
import PaintingWorks from "./components/pages/PaintingWorks";

const App = () => {
    return (
          
        <div className="wrapper">
            <nav>
            <input type="checkbox" id="show-search" />
            <input type="checkbox" id="show-menu" />
            <label htmlFor="show-menu" className="menu-icon"><i className="fas fa-bars"></i></label>
 
            <div className="logo"><a href="#">Materyales</a></div>
            <div className="content">
                <SideMenu />
            </div>
            <label htmlFor="show-search" className="search-icon"><i className="fas fa-search"></i></label>
            <form action="#" className="search-box">
                <input type="text" placeholder="Type Something to Search..." required />
                <button type="submit" className="go-icon"><i className="fas fa-long-arrow-alt-right"></i></button>
            </form>
            </nav>

            <div class="sidebar-left">
                
{/*                  
                <input type="checkbox" id="show-menu2" />
                <label htmlFor="show-menu2" className="menu-icon2"><i className="fas fa-bars"></i></label> */}
                 
                <div className="content2">
                    <SideMenu /> 
                </div>
                  
            </div>
 
            <div className='mainWindow'>
                <Routes>
                    <Route exact path='/floor_area' element={<FloorArea />}></Route>
                    <Route exact path='/suspended_slab' element={<SuspendedSlab />}></Route>
                    <Route exact path='/slab_on_ground' element={<SlabonGround />}></Route>
                    <Route exact path='/painting_works' element={<PaintingWorks />}></Route>
                </Routes>  
            </div>
            <div className="footer">
                Footer
            </div>
        </div>
 
    )
}

export default App
 