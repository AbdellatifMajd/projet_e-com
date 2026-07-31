import ShopHeader from '@/components/Shop/ShopHeader'
import React from 'react'
import { Outlet } from 'react-router-dom'

function ShopLayout() {
  return (
    <div className="flex flex-1 flex-col">
        <div>
          <ShopHeader />
        </div>
        <main >
            <Outlet />
        </main>
    </div>
  )
}

export default ShopLayout