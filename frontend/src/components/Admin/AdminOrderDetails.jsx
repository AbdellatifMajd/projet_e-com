import { DialogContent, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import CommonForm from "@/common/CommonForm";
import { orderDetailsOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  Package,
  MapPin,
  Phone,
  CalendarDays,
  CreditCard,
  User,
  FileText,
  X,
  CheckCircle2,
  Clock3,
  Truck,
  CircleX,
} from "lucide-react";
import { getAdminOrderDetails, updateOrderStatus } from "@/store/ShopOrderSlice";
import { toast } from "sonner";

function AdminOrderDetails() {
  const { orderDetails } = useSelector((state) => state.shopOrder);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    status: orderDetails?.order_status || "",
  });

  if (!orderDetails) {
    return (
      <DialogContent>
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-muted-foreground">
            No order details available.
          </p>
        </div>
      </DialogContent>
    );
  }

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "delivered":
        return <CheckCircle2 size={15} />;

      case "pending":
      case "in process":
        return <Clock3 size={15} />;

      case "shipped":
        return <Truck size={15} />;

      case "cancelled":
      case "failed":
        return <CircleX size={15} />;

      default:
        return null;
    }
  };

const handleUpdateStatus = async (e) => {
  e.preventDefault();

  dispatch(
    updateOrderStatus({ orderId: orderDetails.id, status: formData.status })
  ).then((data) => {
    if (data?.payload?.success) {
      dispatch(getAdminOrderDetails(orderDetails.id));
      toast.success(data.payload.message );
    } else {
      toast.error(data?.payload);
    }
  });
};

  return (
    <DialogContent className="!p-0">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-6 py-5 border-b bg-gray-50">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Order {orderDetails.id}
            </h2>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                orderDetails.order_status,
              )}`}
            >
              {getStatusIcon(orderDetails.order_status)}
              {orderDetails.order_status}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Created on {formatDate(orderDetails.order_date)}
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-6 space-y-6">
        {/* ================= ORDER SUMMARY ================= */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Package size={18} className="text-gray-700" />

            <h3 className="font-semibold text-gray-900">Order Summary</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Order ID */}
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500 mb-1">Order ID</p>

              <p className="font-medium text-gray-900">{orderDetails.id}</p>
            </div>

            {/* Date */}
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500 mb-1">Order Date</p>

              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-gray-500" />

                <p className="font-medium text-gray-900">
                  {formatDate(orderDetails.order_date)}
                </p>
              </div>
            </div>

            {/* Total */}
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500 mb-1">Total Amount</p>

              <p className="text-xl font-bold text-gray-900">
                {Number(orderDetails.total_amount).toFixed(2)} DH
              </p>
            </div>

            {/* Payment */}
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500 mb-1">Payment</p>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-gray-500" />

                  <span className="font-medium capitalize">
                    {orderDetails.payment_method}
                  </span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                    orderDetails.payment_status,
                  )}`}
                >
                  {orderDetails.payment_status}
                </span>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ================= ORDER ITEMS ================= */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Package size={18} className="text-gray-700" />

            <h3 className="font-semibold text-gray-900">Order Items</h3>

            <span className="text-xs text-gray-500">
              ({orderDetails.items?.length || 0})
            </span>
          </div>

          <div className="space-y-3">
            {orderDetails.items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-xl border bg-white"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover border"
                />

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 line-clamp-2">
                    {item.title}
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <span>Qty: {item.quantity}</span>

                    <span>•</span>

                    <span>{Number(item.price).toFixed(2)} DH / unit</span>
                  </div>
                </div>

                {/* Product Total */}
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {(Number(item.price) * Number(item.quantity)).toFixed(2)} DH
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* ================= SHIPPING ================= */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-gray-700" />

            <h3 className="font-semibold text-gray-900">
              Shipping Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Address */}
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-gray-500" />

                <p className="text-sm font-medium text-gray-700">Address</p>
              </div>

              <p className="text-sm text-gray-600">
                {orderDetails.address || "-"}
              </p>

              <p className="text-sm text-gray-600">
                {orderDetails.city || "-"}
              </p>

              {orderDetails.pincode && (
                <p className="text-sm text-gray-600">{orderDetails.pincode}</p>
              )}
            </div>

            {/* Phone */}
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-gray-500" />

                <p className="text-sm font-medium text-gray-700">Phone</p>
              </div>

              <p className="text-sm text-gray-600">
                {orderDetails.phone || "-"}
              </p>
            </div>
          </div>

          {/* Notes */}
          {orderDetails.notes && (
            <div className="mt-3 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={16} className="text-gray-500" />

                <p className="text-sm font-medium text-gray-700">
                  Customer Notes
                </p>
              </div>

              <p className="text-sm text-gray-600">{orderDetails.notes}</p>
            </div>
          )}
        </section>

        <Separator />

        {/* ================= UPDATE STATUS ================= */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Truck size={18} className="text-gray-700" />

            <h3 className="font-semibold text-gray-900">Update Order</h3>
          </div>

          <div className="rounded-xl border p-4 bg-white">
            <CommonForm
              formControls={orderDetailsOptions}
              setFormData={setFormData}
              formData={formData}
              buttonText="Update Order Status"
              onSubmit={handleUpdateStatus}
            />
          </div>
        </section>

        {/* ================= TOTAL ================= */}
        <div className="flex items-center justify-between rounded-xl bg-gray-900 text-white px-5 py-4">
          <div>
            <p className="text-sm text-gray-300">Order Total</p>

            <p className="text-2xl font-bold">
              {Number(orderDetails.total_amount).toFixed(2)} DH
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">Payment</p>

            <p className="text-sm font-medium capitalize">
              {orderDetails.payment_status}
            </p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetails;
