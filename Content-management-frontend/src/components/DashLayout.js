import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import { Box } from "@mui/material";
import Topbar from './DashHeader'
import Sidebar from './SideBar'

const DashLayout = () => {
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <>

        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Topbar setIsSidebar={setIsSidebar} />
            <div>
                <Outlet /> 
            </div>
            </Box>
        </Box>
            
        </>
    )
}
export default DashLayout