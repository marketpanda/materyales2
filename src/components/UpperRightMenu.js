import React, { useState, useEffect } from 'react'
import AuthDetails from './AuthDetails'
import { NavLink } from 'react-router-dom'
import { signOut } from "firebase/auth";
import Modal from './Modal';
import Signin from './auth/Signin';

import { Button, Menu, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'


//account dropdown menu
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar'; 
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
 

const   UpperRightMenu = () => {

    const {pendingSignedIn, isSignedIn, user, auth} = AuthDetails()
    const [loginForm, setLoginForm] = useState(false)
    const [avatarPic, setAvatarPic] = useState('./images/icon_adhesive.jpg') 
    const [menuAnchor, setMenuAnchor] = useState(null)

    useEffect(() => {
         
        setAvatarPic(localStorage.getItem('avatar'))
    }, [avatarPic])

    const overheadItems = {  
        estimates: 'Estimates',
        projects: 'Projects',
        materials_and_reference: 'Materials and Reference',
        marketplace: 'Marketplace',
        professionals_and_skilled_workers: 'Professionals and Skilled Workers'
    }

    const openMenu = Boolean(menuAnchor)

    const handleClickMenu = (e) => {
        setMenuAnchor(e.currentTarget)
    }
    
    const handleCloseMenu = () => {
        setMenuAnchor(null)
    }

    const cascadeOverheadItems = () => {
        const items = overheadItems
        let menus = []

        Object.keys(items).forEach((item) => (
            menus.push (
                <li><NavLink to={item} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>{items[item]}</NavLink></li>

                //template below, each item should render Navlink li
                //<li><NavLink onClick={swipeBack} className={({ isActive }) => (isActive ? 'active' : 'inactive')} to='/floor_area'>Floor Area</NavLink></li>
            ) 
        ))
        return menus
        
    }


    //for account drop down menu
    const [anchorEl, setAnchorEl] = useState(null);   
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
 

    if (!isSignedIn) {


        return (
            <>
                <div className="rightIcons">
                    <div onClick={() => setLoginForm(true)}>
                        <label className="menu-icon">
                            <i className="fas fa-sign-in-alt"></i> 
                        </label> 
                    </div>
                    <div onClick={() => setLoginForm(true)}>
                        <label className="menu-icon">
                            <i class="fas fa-user-plus"></i>
                        </label> 
                    </div>
                </div>

                <div className="rightMenuWords">

                    <div className='overheadMenu'> 
                        <ul>
                            {
                                cascadeOverheadItems()
                            } 
                        </ul> 
                    </div>  
                    <button onClick={() => setLoginForm(true)}>Sign in</button>
                    <NavLink to='/signup'>
                        Signup 
                    </NavLink>
                </div>
                <Modal open={loginForm} onClose={() => setLoginForm(false)}>
                    <Signin />
                </Modal> 
                 
            </>

        ) 

    } else {
        return (
            <>
                 <div className="rightIcons"> 
                        <div> 
                            {/* <img className="avatar" src={require(`${avatarPic}`)} />  */}
                            {/* <img className="avatar" src={localStorage.getItem('avatar')} />  */}
                        </div> 
                 </div>
                
                <div className="rightMenuWords">
                
                    <div className='overheadMenu'> 
                        <ul>
                            {
                                cascadeOverheadItems()
                            } 
                        </ul> 
                    </div>  
 
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            
                        <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <div>
                                <img className="avatar" src={localStorage.getItem('avatar')} /> 
                            </div> 
                            
                        </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                        <Avatar /><NavLink to='/profile'>{localStorage.getItem('userName')}</NavLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                        <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <div onClick={() => {signOut(auth).then(console.log('logged out!'))}}>Sign out</div>
                        </MenuItem>
                    </Menu> 
                </div> 
            </>
        )
        
     } 
}

export default UpperRightMenu