import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import SideBar from './SideBar'
import { Directions } from '@mui/icons-material'

const DashLayout = () => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <div>
                    <DashHeader />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', height: "100%"}}>
                    <SideBar  style={{ width: '30%'}}/>
                    <Outlet  style={{ width: '70%'}}/> 
                </div>
            </div>
            
            
            
            {/*<DashFooter />*/}
        </>
    )
}
export default DashLayout