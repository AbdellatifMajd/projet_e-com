import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Dialog,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import React, { useEffect, useState } from "react";
import { CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/ShopOrderSlice";
import ShopOrderDetails from "./ShopOrderDetails";

console.log("typeof getOrderDetails:", getOrderDetails);

// Mappe chaque statut à une couleur Chip cohérente
const STATUS_STYLES = {
  confirmed: { color: "success", label: "Confirmed" },
  pending: { color: "warning", label: "Pending" },
  delivered: { color: "success", label: "Delivered" },
  shipped: { color: "info", label: "Shipped" },
  cancelled: { color: "error", label: "Cancelled" },
  rejected: { color: "error", label: "Rejected" },
};

function getStatusStyle(status) {
  const key = status?.toLowerCase();
  return STATUS_STYLES[key] || { color: "default", label: status || "Unknown" };
}

function ShopOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, isLoading, orderDetails } = useSelector(
    (state) => state.shopOrder,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  const handleViewDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
    console.log("le dispatch a été déclenché: ", orderId)
    setOpenDetailsDialog(true);
    console.log("order details: ", orderDetails);
  };



  return (
    <Card elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <CardHeader
        title={<CardTitle sx={{ fontWeight: 600 }}>Order History</CardTitle>}
        subheader={
          orderList.length > 0
            ? `${orderList.length} order${orderList.length > 1 ? "s" : ""}`
            : undefined
        }
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 2,
        }}
      />

      <CardContent sx={{ p: 0 }}>
        {/* --- Loading state --- */}
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              gap: 2,
            }}
          >
            <CircularProgress size={32} />
            <Skeleton variant="rectangular" width={"100%"} height={118}>
              Loading your orders…
            </Skeleton>
          </Box>
        ) : !orderList.length > 0 ? (
          /* --- Empty state --- */
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              gap: 1,
              color: "text.secondary",
            }}
          >
            <InboxOutlinedIcon sx={{ fontSize: 48, opacity: 0.4 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              No orders yet
            </Typography>
            <Typography variant="body2">
              Your past orders will show up here once you place one.
            </Typography>
          </Box>
        ) : (
          /* --- Orders table --- */
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{ "& th": { fontWeight: 600, bgcolor: "grey.50" } }}
                >
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Details</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orderList && orderList.length > 0
                  ? orderList.map((orderItem) => {
                      const status = getStatusStyle(orderItem?.order_status);
                      return (
                        <TableRow
                          key={orderItem.id}
                          hover
                          sx={{
                            "&:last-child td": { borderBottom: 0 },
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {orderItem?.order_date.split("T")[0]}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={status.label}
                              color={status.color}
                              size="small"
                              sx={{
                                fontWeight: 500,
                                textTransform: "capitalize",
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              {orderItem?.total_amount} MAD
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={() => handleViewDetails(orderItem?.id)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {orderDetails && (
          <ShopOrderDetails openDetailsDialog={openDetailsDialog} setOpenDetailsDialog={setOpenDetailsDialog} orderDetails={orderDetails} />
        )}
      </CardContent>
    </Card>
  );
}

export default ShopOrders;
