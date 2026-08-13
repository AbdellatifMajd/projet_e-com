import { DialogContent } from '@mui/material'
import React, { useState } from 'react'
import { Separator } from '../ui/separator'
import CommonForm from '@/common/CommonForm'
import { orderDetailsOptions } from '@/config'

function AdminOrderDetails() {
    const [formData, setFormData] = useState({
        status: "",
    })
    const handleUpdateStatus = (e) =>{
        e.preventDefault();
    }
  return (
    <DialogContent>
            <div className='grid gap-6'>
                <div className='grid gap-2'>
                    <div className='flex items-center justify-between'>
                        <p className='font-medium'>Order ID</p>
                        <span> 12345 </span>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='font-medium'>Order Date</p>
                        <span> 10/08/2026 </span>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='font-medium'>Order Price</p>
                        <span> 500 DH </span>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='font-medium'>Order Status</p>
                        <span> In process </span>
                    </div>
                </div>

                <Separator />

                <div className='grid grid-4'>
                    <div className='grid grid-2'>
                        <div className='font-bold'> Order Details </div>
                        <ul className='grid gap-3'>
                            <li className='flex items-center justify-between'>
                                <span>Product One</span>
                                <span>100 DH</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='grid grid-4'>
                    <div className='grid grid-2'>
                        <div className='font-bold'> Shipping Infos</div>
                        <div className='grid gap-0.5 text-muted-foreground'>
                            <span>Abdellatif MAJD</span>
                            <span>Address</span>
                            <span>City</span>
                            <span>Pincode</span>
                            <span>Notes</span>
                        </div>
                    </div>
                </div>

                <CommonForm
                    formControls={orderDetailsOptions}
                    setFormData={setFormData}
                    formData={formData}
                    buttonText={"Update Order Status"}
                    onSubmit={handleUpdateStatus}


                />

            </div>
    </DialogContent>
  )
}

export default AdminOrderDetails