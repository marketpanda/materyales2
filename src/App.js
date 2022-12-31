import React from "react";
import './styles2.css' 
// import Menu from "./components/menu/Menu";
import SideMenu from "./components/SideMenu";
import {Routes, Route} from 'react-router-dom'
import FloorArea from "./components/pages/FloorArea";
import SuspendedSlab from "./components/pages/SuspendedSlab";
import SlabonGround from "./components/pages/SlabonGround";
import PaintingWorks from "./components/pages/PaintingWorks";
import Footer from "./components/Footer";
 

const App = () => {
    const show = () => {
        document.getElementById('switch').classList.toggle('active')
        console.log('hi there')
    }
    return (
          
        <div className="wrapper">
            <div className="banner">
                <div className="logo">Materyales</div> 
            </div>

            <div class="sidebar-left"> 
                <div  id='toggleMenu' className="toggle" onClick={() => show()}>
                    {/* <input type='checkbox' id='navigation' /> */}
                    <label className="menu-icon">
                        <i className="fas fa-bars"></i>
                    </label> 
                </div>

                <nav id="switch">
                    <SideMenu /> 
                </nav> 
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
                <Footer />
            </div>
        </div>
 
    )
}

export default App
 