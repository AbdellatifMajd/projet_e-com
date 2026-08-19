import React from "react";

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  inProcess: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const FALLBACK_STYLE = "bg-gray-100 text-gray-700";

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
      STATUS_STYLES[status] || FALLBACK_STYLE
    }`}
  >
    {status}
  </span>
);

function RecentOrders({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white border rounded-lg p-4">
        <h2 className="font-semibold mb-4">Recent Orders</h2>
        <p className="text-gray-400 text-sm">Aucune commande récente.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="font-semibold mb-4">Recent Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="text-left py-3 font-medium">Order</th>
              <th className="text-left py-3 font-medium">Customer</th>
              <th className="text-left py-3 font-medium">Status</th>
              <th className="text-right py-3 font-medium">Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 font-medium">{order.id}</td>

                <td className="py-3">
                  <div className="flex flex-col">
                    <span>{order.user?.name || "Unknown"}</span>
                    {order.user?.email && (
                      <span className="text-xs text-gray-400">
                        {order.user.email}
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3">
                  <StatusBadge status={order.order_status} />
                </td>

                <td className="py-3 text-right font-medium">
                  {Number(order.total).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  MAD
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;