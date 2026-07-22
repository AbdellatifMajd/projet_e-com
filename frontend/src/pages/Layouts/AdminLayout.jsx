import React from 'react'
import { Outlet } from 'react-router-dom'

import AdminAsideBar from '../../components/AdminAsideBar'
import AdminHeader from '../../components/AdminHeader'

function AdminLayout() {
  return (
    
    <div className='min-h-screen w-full'>

      <AdminAsideBar />
      <div className='flex flex-1 flex-col'>
        <AdminHeader />
      </div>
    <main className='flex flex-1 flex-col p-4 md:p-6'>
      <Outlet />
    </main>
    </div>

  )


}

export default AdminLayout
