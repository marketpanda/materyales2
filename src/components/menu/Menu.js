import React from "react";
import './menu.css'   
import SideMenu from "../SideMenu";

const Menu = () => {
    return (
          
        <header>
        <div className="sliding--menu__wrapper">
            <input type="checkbox" id="navigation" />        
            <label id="hamburger--icon" htmlFor="navigation">
            <span className="icon-menu">=</span>
            </label>      

            <nav>
                <SideMenu />
            </nav>

            <div className="obfuscator">
            </div>        
        </div>
        </header>
  
    )
}

export default Menu
 