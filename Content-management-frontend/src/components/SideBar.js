import { useState } from "react";
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Box, Typography, IconButton, useTheme } from "@mui/material"
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";

// Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import TaskIcon from "@mui/icons-material/AssignmentTurnedIn";
import AdminIcon from "@mui/icons-material/Settings";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

// Menu Items for sidebar navigation
const OpenTasks = ({ selected, setSelected }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
        setSelected("Tasks");
    };

    return (
        <MenuItem
          active={selected === "Tasks"}
          icon={<HomeOutlinedIcon />}
          onClick={handleClick}
        >
          Tasks
          {open ? <ExpandLess /> : <ExpandMore />}
          <Menu iconShape="square" className={open ? "sub-menu expanded" : "sub-menu"}>
            <MenuItem>
                <Link to="/dash/tasks">View Tasks</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/dash/tasks/new">Add Task</Link>
            </MenuItem>
          </Menu>
        </MenuItem>
    );
};

const OpenUsers = ({ selected, setSelected }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
        setSelected("Users");
    };

    return (
        <MenuItem
          active={selected === "Users"}
          icon={<HomeOutlinedIcon />}
          onClick={handleClick}
        >
          Users
          {open ? <ExpandLess /> : <ExpandMore />}
          <Menu iconShape="square" className={open ? "sub-menu expanded" : "sub-menu"}>
            <MenuItem>
                <Link to="/dash/users">View Users</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/dash/users/new">Add User</Link>
            </MenuItem>
          </Menu>
        </MenuItem>
    );
};

const OpenAdmin = ({ selected, setSelected }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
        setSelected("Admin Settings");
    };

    return (
        <MenuItem
          active={selected === "Admin Settings"}
          icon={<HomeOutlinedIcon />}
          onClick={handleClick}
        >
          Admin Settings
          {open ? <ExpandLess /> : <ExpandMore />}
          <Menu iconShape="square" className={open ? "sub-menu expanded" : "sub-menu"}>
            <MenuItem>
                <Link to="/dash/admin">Manage Roles & Status</Link>
            </MenuItem>
          </Menu>
        </MenuItem>
    );
};

const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
  
    return (
        <Box
        sx={{
            display: 'flex ', 
            height: '100vh',
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    CMS
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
  
            {!isCollapsed && (
              <Box mb="25px">
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    SuperAdmin
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    VP Admin
                  </Typography>
                </Box>
              </Box>
            )}
  
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Home
            </Typography>
            <MenuItem
              icon={<HomeIcon />}
              active={selected === "Dashboard"}
              onClick={() => setSelected("Dashboard")}
            >
              Dashboard
              <Link to="/dash" />
            </MenuItem>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Tasks
            </Typography>
            <MenuItem
              icon={<TaskIcon />}
              active={selected === "Tasks"}
              onClick={() => setSelected("Tasks")}
            >
              View Tasks
              <Link to="/dash/tasks" />
            </MenuItem>
            <MenuItem
              icon={<NoteAddIcon />}
              active={selected === "Tasks"}
              onClick={() => setSelected("Tasks")}
            >
              Add Tasks
              <Link to="/dash/tasks/new" />
            </MenuItem>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users
            </Typography>
            <MenuItem
              icon={<GroupIcon />}
              active={selected === "Users"}
              onClick={() => setSelected("Users")}
            >
              View Users
              <Link to="/dash/users" />
            </MenuItem>
            <MenuItem
              icon={<PersonAddIcon />}
              active={selected === "Users"}
              onClick={() => setSelected("Users")}
            >
              Add Users
              <Link to="/dash/users/new" />
            </MenuItem>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Settings
            </Typography>
            <MenuItem
              icon={<AdminIcon />}
              active={selected === "Admin Settings"}
              onClick={() => setSelected("Admin Settings")}
            >
              Admin Settings
              <Link to="/dash/admin" />
            </MenuItem>
          </Menu>
        </ProSidebar>
      </Box>
    );
  };

export default SideBar;
