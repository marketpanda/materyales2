import React, {useContext, useState, createContext, useEffect} from "react";
import './styles2.css' 
 
import SideMenu from "./components/SideMenu";
import {Routes, Route, useLocation} from 'react-router-dom'
import FloorArea from "./components/pages/FloorArea";
import SuspendedSlab from "./components/pages/SuspendedSlab";
import SlabonGround from "./components/pages/SlabonGround";
import PaintingWorks from "./components/pages/PaintingWorks";
import Polycarbonate from "./components/pages/Polycarbonate";
import CHBWall from "./components/pages/CHBWall";
import Roof from "./components/pages/Roof";
import Ceiling from "./components/pages/Ceiling";
import WoodPlanksFlooring from "./components/pages/WoodPlanksFlooring";
import FloorTiles from "./components/pages/FloorTiles";
import Waterproofing from "./components/pages/Waterproofing";
import CHBWallFencing from "./components/pages/CHBWallFencing";
import Footing from "./components/pages/Footing";
import ConcreteBeam from "./components/pages/ConcreteBeam";
import ConcreteColumn from "./components/pages/ConcreteColumn";
  
import Footer from "./components/Footer";

import __FeedDimensions from "./components/__FeedDimensions";
import RandomImage from "./components/RandomImage";
 
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import {NavLink} from 'react-router-dom'
import AuthDetails from "./components/AuthDetails";
import  {auth, providerGoogle } from './components/Firebase'

import Estimates from "./components/Estimates";

import Modal from "./components/Modal";

import FrontPage from "./components/FrontPage";

import UpperRightMenu from "./components/UpperRightMenu";
import { guides } from "./components/Tips";
import UploadProject from "./components/functions/UploadProject";
import Projects from "./components/functions/Projects";
import MarketPlace from "./components/MarketPlace";
import MaterialsAndReference from "./components/MaterialsAndReference";
import ProfessionalsAndSkilledWorkers from "./components/ProfessionalsAndSkilledWorkers";

import Profile from "./components/Profile";
import User from "./components/User";
import ProjectDetails from "./components/functions/ProjectDetails";


export const LoginContext = createContext();

const App = () => {

     
    //side menu, visible on tablets and mobile
    const show = () => {
        document.getElementById('switch').classList.toggle('active')
    }

    const BreadCrumbs = () => {
        const location = useLocation()
        return location.pathname
    }
 
    //dimensions
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [area, setArea] = useState('')

    const [loginForm, setLoginForm] = useState(false)

    const [userLog, setUserLog] = useState(false)
    const [userId, setUserId] = useState(null)
 
    const {pendingSignedIn, isSignedIn, user, auth} = AuthDetails()

    useEffect(() => {
      if (isSignedIn) {
        setUserLog(true)
        setUserId(user.uid)
        //console.log(user)
      } else {
        setUserLog(false)
      }
      
       
    }, [isSignedIn])
    

    const [guideMessage, setGuideMessage] = useState('')

    const provideMessage = (e) => {
        const selected = e.target.value
        setGuideMessage(selected)
    }

    // console.log(AuthDetails()) 

    return (
        <>
        <div className="wrapper">
 
            <div className="banner">
                <div className="logo"><NavLink to='/'>Materyales</NavLink></div> 
                <div className="rightMenu">  
                    <UpperRightMenu /> 
                </div> 
            </div> 

            <div className="window">
                <LoginContext.Provider value={[userLog, setUserLog]}>
                <Routes>
                    <Route path='/' exact element={<FrontPage />}>
                        <Route path='floor_area' element={<FloorArea />}></Route>
                        <Route path='suspended_slab' element={<SuspendedSlab />}></Route>
                        <Route path='slab_on_ground' element={<SlabonGround />}></Route>
                        <Route path='painting_works' element={<PaintingWorks
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}   
                            />}>
                        </Route> 

                        <Route path='polycarbonate' element={<Polycarbonate
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        
                        />}></Route>
                        <Route path='CHB_wall' element={<CHBWall
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}>

                        </Route>

                        <Route path='roof' element={<Roof
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route>

                        <Route path='ceiling' element={<Ceiling
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route>

                        <Route path='wood_planks_flooring' element={<WoodPlanksFlooring
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route>

                        <Route path='floor_tiles' element={<FloorTiles
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route>

                        <Route path='waterproofing' element={<Waterproofing
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route>

                        <Route path='CHB_wall_fencing' element={<CHBWallFencing
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route> 




                    </Route>
                    <Route path='estimates' element={<Estimates />}> 
                        <Route path='floor_area' element={<FloorArea />}></Route>
                        <Route path='suspended_slab' element={<SuspendedSlab />}></Route>
                        <Route path='slab_on_ground' element={<SlabonGround />}></Route>
                        <Route path='painting_works' element={<PaintingWorks
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}   
                            />}>
                        </Route> 

                        <Route path='polycarbonate' element={<Polycarbonate
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        
                        />}></Route>
                        <Route path='CHB_wall' element={<CHBWall
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}> 
                        </Route>

                        <Route path='roof' element={<Roof
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route>

                        <Route path='ceiling' element={<Ceiling
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route>

                        <Route path='wood_planks_flooring' element={<WoodPlanksFlooring
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route>

                        <Route path='floor_tiles' element={<FloorTiles
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route>

                        <Route path='waterproofing' element={<Waterproofing
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route>

                        <Route path='CHB_wall_fencing' element={<CHBWallFencing
                            length={length}
                            setLength={setLength}
                            width={width}
                            setWidth={setWidth}
                            area={area}
                            setArea={setArea}
                        />}></Route> 

                    </Route>
                    <Route exact path='/signup' element={<Signup />}></Route>
                    <Route exact path='/upload_project' element={<UploadProject />}></Route>  
                    <Route exact path='/projects' element={<Projects />}></Route>
                    <Route exact path='/projects/project_details/:project_id' element={<ProjectDetails />}></Route> 
                    <Route exact path='/materials_and_reference' element={<MaterialsAndReference />}></Route>
                    <Route exact path='/marketplace' element={<MarketPlace />}></Route>
                    <Route exact path='/professionals_and_skilled_workers' element={<ProfessionalsAndSkilledWorkers />}></Route>
                    <Route exact path='/profile' element={<Profile
                        userId={userId}
                        setUserId={setUserId}
                    />}
                        
                    ></Route>
                    <Route exact path='/user/:user_id' element={<User />}></Route>
 

                </Routes>
                </LoginContext.Provider>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
        
        </>
 
    )
}

export default App


 