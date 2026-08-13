import { Button, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { CardTitle } from '../ui/card'

function ShopOrders() {
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
                  <Button variant='contained'>view details</Button>
                </TableRow>
              </TableBody>
            </Table>
      </CardContent>
    </Card>
  )
}

export default ShopOrders