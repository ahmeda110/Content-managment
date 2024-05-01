import * as React from 'react'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import useAuth from '../hooks/useAuth'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import Badge from '@mui/material/Badge';

import NotificationsIcon from '@mui/icons-material/Notifications';

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/tasks(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { username, isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewTaskClicked = () => navigate('/dash/tasks/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onTasksClicked = () => navigate('/dash/tasks')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newTaskButton = null
    if (NOTES_REGEX.test(pathname)) {
        newTaskButton = (
            <button
                className="icon-button"
                title="New Task"
                onClick={onNewTaskClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let tasksButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        tasksButton = (
            <button
                className="icon-button"
                title="Tasks"
                onClick={onTasksClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    const handleLogout = () => {
        sendLogout(); // Initiate the logout process
        navigate('/login'); // Navigate to the login page after successful logout
    };

    const handleProfileClick = () => {
        // Add code to handle profile click action
        console.log("Profile clicked");
    };

    const handleAccountClick = () => {
        // Add code to handle account click action
        console.log("Account clicked");
    };

    const handleDashboardClick = () => {
        // Add code to handle dashboard click action
        console.log("Dashboard clicked");
    };

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {newTaskButton}
                {newUserButton}
                {tasksButton}
                {userButton}                
            </>
        )
    }

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const [anchorElNotif, setAnchorElNotif] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNotifMenu = (event) => {
        setAnchorElNotif(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNotifMenu = () => {
        setAnchorElNotif(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    return (
        <div className='topNavBar'>
            <div>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'white',
                        pointer: "cursor",
                        textDecoration: 'none',
                    }}>
                    CMS
                </Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <MenuItem>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={handleOpenNotifMenu}
                    >
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon sx={{ color: "white" }} />
                        </Badge>
                    </IconButton>
                </MenuItem>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNotif}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNotif)}
                    onClose={handleCloseNotifMenu}
                    sx={{
                        display: { md: 'block', sx: 'none' },
                    }}
                >
                    <Typography>Notifications</Typography>
                </Menu>

                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}>
                        <Avatar sx={{ height: '35px', width: '35px', color: "black" }}>{username[0]}</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {/* Menu items with functional handlers */}
                    <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                    <MenuItem onClick={handleAccountClick}>Account</MenuItem>
                    <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                </div> 
            </div>
            );

}
            export default DashHeader