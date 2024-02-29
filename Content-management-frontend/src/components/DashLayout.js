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
                    <SideBar style={{ width: '30%' }}/>
                    <div style={{ marginLeft: '20%', width: '70%' }}>
                        <Outlet style={{ width: '100%' }}/> 
                    </div>
                    
                </div>
            </div>
            
            
            
            {/*<DashFooter />*/}
        </>
    )
}
export default DashLayout