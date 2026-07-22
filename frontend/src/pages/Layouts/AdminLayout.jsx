import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar'; 
import AdminAsideBar from '../../components/AdminAsideBar';
import AdminHeader from '../../components/AdminHeader';

function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
                <AdminAsideBar />

        <div className="flex flex-1 flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>

      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;