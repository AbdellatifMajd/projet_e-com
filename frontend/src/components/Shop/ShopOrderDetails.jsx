import { resetOrderDetails } from "@/store/ShopOrderSlice";
import {
  Dialog,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  X,
  CalendarDays,
  CreditCard,
  MapPin,
  Phone,
  Package,
  CheckCircle2,
  Clock3,
  Truck,
  CircleAlert,
  ShoppingBag,
} from "lucide-react";

function ShopOrderDetails({
  openDetailsDialog,
  setOpenDetailsDialog,
  orderDetails,
}) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenDetailsDialog(false);
    dispatch(resetOrderDetails());
  };

  if (!orderDetails) return null;

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "paid":
      case "delivered":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("MAD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog
      open={openDetailsDialog}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "rounded-2xl overflow-hidden",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b bg-gray-50">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Order {orderDetails.id}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                orderDetails.order_status
              )}`}
            >
              {orderDetails.order_status}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Placed on {formatDate(orderDetails.order_date)}
          </p>
        </div>

        <IconButton onClick={handleClose}>
          <X size={20} />
        </IconButton>
      </div>

      <DialogContent className="!p-6">
        {/* Order Summary */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag size={19} className="text-gray-700" />
            <h3 className="font-semibold text-gray-900">
              Order Summary
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Order Date */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <CalendarDays size={18} className="text-gray-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Order Date</p>
                <p className="font-medium text-gray-900">
                  {formatDate(orderDetails.order_date)}
                </p>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <CreditCard size={18} className="text-gray-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Total Amount</p>
                <p className="font-semibold text-lg text-gray-900">
                  {Number(orderDetails.total_amount).toFixed(2)} MAD
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <CreditCard size={18} className="text-gray-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Payment Method</p>
                <p className="font-medium text-gray-900 capitalize">
                  {orderDetails.payment_method}
                </p>
              </div>
            </div>

            {/* Payment Status */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                {orderDetails.payment_status === "paid" ? (
                  <CheckCircle2 size={18} className="text-green-600" />
                ) : (
                  <Clock3 size={18} className="text-yellow-600" />
                )}
              </div>

              <div>
                <p className="text-xs text-gray-500">Payment Status</p>

                <span
                  className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                    orderDetails.payment_status
                  )}`}
                >
                  {orderDetails.payment_status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Order Items */}
        <div className="my-6">
          <div className="flex items-center gap-2 mb-4">
            <Package size={19} className="text-gray-700" />
            <h3 className="font-semibold text-gray-900">
              Order Items
            </h3>
          </div>

          <div className="space-y-3">
            {orderDetails.items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 border rounded-xl hover:bg-gray-50 transition"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg object-cover border"
                />

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 line-clamp-2">
                    {item.title}
                  </h4>

                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span>
                      Qty: <strong>{item.quantity}</strong>
                    </span>

                    <span>•</span>

                    <span>
                      {Number(item.price).toFixed(2)} MAD
                    </span>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    
                    {(
                      Number(item.price) * Number(item.quantity)
                    ).toFixed(2)} MAD
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Delivery Information */}
        <div className="my-6">
          <div className="flex items-center gap-2 mb-4">
            <Truck size={19} className="text-gray-700" />
            <h3 className="font-semibold text-gray-900">
              Delivery Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={17} className="text-gray-600" />
                <p className="text-sm font-medium text-gray-700">
                  Address
                </p>
              </div>

              <p className="text-sm text-gray-600">
                {orderDetails.address || "-"}
              </p>

              <p className="text-sm text-gray-600">
                {orderDetails.city}{" "}
                {orderDetails.pincode &&
                  `, ${orderDetails.pincode}`}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={17} className="text-gray-600" />
                <p className="text-sm font-medium text-gray-700">
                  Phone
                </p>
              </div>

              <p className="text-sm text-gray-600">
                {orderDetails.phone || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {orderDetails.notes && (
          <>
            <Divider />

            <div className="my-6">
              <div className="flex items-center gap-2 mb-3">
                <CircleAlert size={18} className="text-gray-600" />

                <h3 className="font-semibold text-gray-900">
                  Order Notes
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 text-sm text-gray-600">
                {orderDetails.notes}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t">
          <div>
            <p className="text-sm text-gray-500">
              Total
            </p> 

            <p className="text-2xl font-bold text-gray-900">
              {Number(orderDetails.total_amount).toFixed(2)} MAD
            </p>
          </div>

          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShopOrderDetails;