import AdminOrderDetails from '@/components/Admin/AdminOrderDetails';
import { CardTitle } from '@/components/ui/card'
import { Card, CardContent, CardHeader, Table, TableRow,TableCell, TableBody, Button, TableHead, Dialog } from '@mui/material'
import React, { useState } from 'react'

function AdminOrders() {
    const [openOrderDetails, setOpenOrderDetails] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>

      <CardContent>
            <Table>
              <TableRow>
                <TableCell>Order ID </TableCell>
                <TableCell>Order date </TableCell>
                <TableCell>Order status </TableCell>
                <TableCell>Order price </TableCell>
                <TableCell><span>Details</span></TableCell>
              </TableRow>

              <TableBody>
                <TableRow>
                  <TableCell>12345</TableCell>
                  <TableCell>12/03/2022</TableCell>
                  <TableCell>pending</TableCell>
                  <TableCell>1200 DH</TableCell>
                 <Button variant='contained' onClick={()=>setOpenOrderDetails(true)}>view details</Button>
                </TableRow>
              </TableBody>

                  <Dialog 
                    open={openOrderDetails} 
                    onClose={()=>setOpenOrderDetails(false)}
                    fullWidth
                    sx={{marginTop: "6px"}}
                    >
                    <AdminOrderDetails />
                  </Dialog>
            </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrders