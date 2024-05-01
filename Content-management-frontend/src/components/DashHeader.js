import * as React from 'react'
import { useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import useAuth from '../hooks/useAuth'
import { ColorModeContext, tokens } from "../theme";
import { Box, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


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
import SearchIcon from "@mui/icons-material/Search";

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

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

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
                {logoutButton}
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

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const content = (
        <Box display="flex" backgroundColor={colors.primary[400]} justifyContent="space-between" p={2}>
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
            </Box>

            <Box>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton size="small" aria-label="show 17 new notifications" color="inherit" onClick={handleOpenNotifMenu}>
                    <MenuItem>
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon/>
                        </Badge>
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
                </IconButton>
    
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}>
                        <PersonOutlinedIcon />
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
                    {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                    ))}
                </Menu>
            </Box>

        </Box>
    )

    return content
}
export default DashHeader