import React from 'react'
import {LogOut} from "lucide-react";
import { Button } from '@mui/material'

function AdminHeader() {
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b' >

            <span>
                Toggle menu
            </span>
            <div>
                <Button>
                    <LogOut />
                    Logout
                </Button>
            </div>
    </header>
  )
}

export default AdminHeader
