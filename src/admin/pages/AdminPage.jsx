import React from 'react'
import Sidebar from './Sidebar'
import DashboardView from './DashboardView'
import {Outlet} from 'react-router-dom'
import Main from './Main'
import Dashboard from '../../components/Dashboard'

const AdminPage = () => {
  return (
   <div className="flex">
     <div className="basis-[12%] h-[100vh]">
        <Sidebar />
     </div>
     <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <Dashboard />
        <div>
          <Outlet>
              
          </Outlet>
        </div>
        <Main />
     </div>
   </div>
  )
}

export default AdminPage