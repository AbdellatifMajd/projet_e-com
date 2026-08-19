import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatCard from "@/components/Admin/Dashboard/StatCard";
import SalesChart from "@/components/Admin/Dashboard/SalesChart";
import OrderStatusChart from "@/components/Admin/Dashboard/OrderStatusChart";
import TopProducts from "@/components/Admin/Dashboard/TopProducts";
import RecentOrders from "@/components/Admin/Dashboard/RecentOrders";
import { fetchDashboardStats } from "@/store/AdminDashboardSlice";
import { Skeleton } from "@mui/material";
import { PERIOD_OPTIONS } from "@/config";


const Dashboard = () => {
  const dispatch = useDispatch();
  const [period, setPeriod] = useState(30);

  const { data,isLoading,  error } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats(period));
  }, [dispatch, period]);

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          Impossible de charger les statistiques. {error?.message || ""}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <select
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
          className="border rounded-lg px-3 py-2 text-sm bg-white"
        >
          {PERIOD_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading || !data ? (
        <div>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={'60vh'}
            sx={{ mb: 2 }}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Revenue"
              value={`${data.summary.revenue} MAD`}
            />
            <StatCard title="Orders" value={data.summary.orders} />
            <StatCard title="Customers" value={data.summary.customers} />
            <StatCard title="Products Sold" value={data.summary.product_sold} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalesChart data={data.sales} />
            </div>

            <OrderStatusChart data={data.orderStatus} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopProducts products={data.topProducts} />
            <RecentOrders orders={data.recentOrders} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
