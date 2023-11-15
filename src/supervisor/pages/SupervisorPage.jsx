import React from 'react'
import SupSidebar from './SupSidebar'
import DashboardSup from './DashboardSup'
import {Outlet} from 'react-router-dom'
import SupMain from './SupMain'

const SupervisorPage = () => {
  return (
   <div className="flex">
     <div className="basis-[12%] h-[100vh]">
        <SupSidebar />
     </div>
     <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <DashboardSup />
        <div>
          <Outlet>
              
          </Outlet>
        </div>
        <SupMain />
     </div>
   </div>
  )
}

export default SupervisorPage