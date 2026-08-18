import AdminOrderDetails from "@/components/Admin/AdminOrderDetails";
import { CardTitle } from "@/components/ui/card";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrderDetails, getAllOrdersOfAllUsers } from "@/store/ShopOrderSlice";
import { Eye, X } from "lucide-react";

function AdminOrders() {
  const dispatch = useDispatch();

  const { orderList, isLoading } = useSelector(
    (state) => state.shopOrder
  );

  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  useEffect(() => {
    dispatch(getAllOrdersOfAllUsers());
  }, [dispatch]);

  const handleOpenDetails = (order) => {
    // Si ton thunk getOrderDetails existe :
    dispatch(getAdminOrderDetails(order?.id));

    setOpenOrderDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenOrderDetails(false);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "delivered":
      case "paid":
        return "bg-green-100 text-green-700";

      case "pending":
      case "in process":
        return "bg-yellow-100 text-yellow-700";

      case "inprocess":
        return "bg-blue-100 text-blue-700";
        
      case "in shipping":
        return "bg-blue-100 text-blue-200";

      case "rejected":
      case "failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <Card className="border-0 shadow-sm">
        {/* ================= HEADER ================= */}
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                Order History
              </CardTitle>

              <p className="text-sm text-gray-500 mt-1">
                Manage and track all customer orders.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {orderList?.length || 0} orders
            </span>
          </div>
        </CardHeader>

        {/* ================= TABLE ================= */}
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">

                  <TableCell className="font-semibold">
                    Order Date
                  </TableCell>

                  <TableCell className="font-semibold">
                    Status
                  </TableCell>

                  <TableCell className="font-semibold">
                    Payment
                  </TableCell>

                  <TableCell className="font-semibold">
                    Total
                  </TableCell>

                  <TableCell align="right" className="font-semibold">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      className="py-10"
                    >
                      Loading orders...
                    </TableCell>
                  </TableRow>
                ) : orderList?.length > 0 ? (
                  orderList.map((order) => (
                    <TableRow
                      key={order.id}
                      hover
                      className="transition"
                    >

                      {/* Date */}
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {order.order_date
                            ? new Date(
                                order.order_date
                              ).toLocaleDateString("en-US")
                            : "-"}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                            order.order_status
                          )}`}
                        >
                          {order.order_status}
                        </span>
                      </TableCell>

                      {/* Payment */}
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium capitalize">
                            {order.payment_method || "-"}
                          </span>

                          <span
                            className={`text-xs capitalize ${
                              order.payment_status === "paid"
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            {order.payment_status || "-"}
                          </span>
                        </div>
                      </TableCell>

                      {/* Total */}
                      <TableCell>
                        <span className="font-semibold text-gray-900">
                          {Number(order.total_amount || 0).toFixed(2)} DH
                        </span>
                      </TableCell>

                      {/* Action */}
                      <TableCell align="right">
                        <button
                          onClick={() => handleOpenDetails(order)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                        >
                          <Eye size={16} />
                          View details
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                      className="py-12"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <p className="font-medium text-gray-700">
                          No orders found
                        </p>

                        <p className="text-sm text-gray-500">
                          There are no customer orders yet.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ================= DETAILS DIALOG ================= */}
      <Dialog
        open={openOrderDetails}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle className="!p-0">
          <div className="flex justify-end px-4 pt-3">
            <IconButton onClick={handleCloseDetails}>
              <X size={20} />
            </IconButton>
          </div>
        </DialogTitle>

        <AdminOrderDetails onClose={handleCloseDetails} />
      </Dialog>
    </>
  );
}

export default AdminOrders;