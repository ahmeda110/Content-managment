import { useState } from "react";
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Drawer, Box, Typography, Divider, ListItemButton, ListItemText, ListItemIcon, Collapse } from "@mui/material"

import List from '@mui/material/List'
import HomeIcon from '@mui/icons-material/Home'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
// Tasks
import NoteAdd from '@mui/icons-material/NoteAdd'
import FileOpen from '@mui/icons-material/FileOpen'
import InsertDriveFile from '@mui/icons-material/InsertDriveFile'
// Users
import Person from '@mui/icons-material/Person'
import Group from "@mui/icons-material/Group";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import PersonOff from "@mui/icons-material/PersonOff";

const OpenTasks = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon><InsertDriveFile /></ListItemIcon>
                <ListItemText primary={<Typography style={ {color: "Black", display: 'flex', justifyContent: 'space-between'}}>Tasks
                {open ? <ExpandLess /> : <ExpandMore />}
                </Typography>}/>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to="/dash/tasks">
                        <ListItemIcon><FileOpen /></ListItemIcon>
                        <ListItemText primary={<Typography style={ {color: "Black"}}>View Tasks</Typography>}/>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to="/dash/tasks/new">
                        <ListItemIcon><NoteAdd /></ListItemIcon>
                        <ListItemText primary={<Typography style={ {color: "Black"}}>Add Task</Typography>}/>
                    </ListItemButton>
                </List>
            </Collapse>
        </Box>
    )
}

const OpenUsers = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon><Person /></ListItemIcon>
                <ListItemText primary={<Typography style={ {color: "Black", display: 'flex', justifyContent: 'space-between'}}>Users
                {open ? <ExpandLess /> : <ExpandMore />}
                </Typography>}/>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to="/dash/users">
                        <ListItemIcon><Group /></ListItemIcon>
                        <ListItemText primary={<Typography style={ {color: "Black"}}>View Users</Typography>}/>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to="/dash/users/new">
                        <ListItemIcon><PersonAddAlt1 /></ListItemIcon>
                        <ListItemText primary={<Typography style={ {color: "Black"}}>Add User</Typography>}/>
                    </ListItemButton>
                </List>
            </Collapse>
        </Box>
    )
}

const SideBar = () => {
    
    const { username, isManager, isAdmin } = useAuth()

    return (
        <div style={{ background: "white", borderRight: "1px solid rgba(20, 26, 31, 0.8)", position: "fixed", height: "100%", width: '20%'}}>
            <Box textAlign='center' role='presentation'>
                {/*
                <Typography pb={2} variant='h6' component='div'>
                    CMS
                </Typography>
                <Divider /> */}

                <List>
                    <ListItemButton component={Link} to="/dash">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary={<Typography style={{ color: "Black" }}>Home</Typography>} />
                    </ListItemButton>
                    {/* Tasks */}
                    <OpenTasks />
                    {/* Users */}
                    {(isManager || isAdmin) && <OpenUsers />}
                </List>
            </Box>
        </div>
    )
}


export default SideBar

/*
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const SideBar = () => {
    
    const { username, isManager, isAdmin } = useAuth()

    const content = (
        
        <div className='sidenav'>
            <h1>CMS</h1>
            <p><Link to="/dash"><FontAwesomeIcon icon={faHouse}/> Home</Link></p>
            <p><Link to="/dash/tasks"><FontAwesomeIcon icon={faFile}/> View Tasks</Link></p>
            

            
            {(isManager || isAdmin) && <p><Link to="/dash/users"><FontAwesomeIcon icon={faUser}/> User Settings</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}
        </div>
    )

    return content
}
export default SideBar





*/