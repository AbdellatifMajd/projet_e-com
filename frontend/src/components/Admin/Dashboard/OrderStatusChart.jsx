import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Couleurs cohérentes par statut connu, fallback pour statuts inattendus
const STATUS_COLORS = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  inProcess: "#8b5cf6",
  delivered: "#22c55e",
  rejected: "#ef4444",
};

const FALLBACK_COLOR = "#9ca3af";

const OrderStatusChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <h2 className="font-semibold mb-4">Orders Status</h2>
        <p className="text-gray-400 text-sm">Aucune commande pour le moment.</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.count, 0);

  const chartData = {
    labels: data.map((item) => item.order_status),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: data.map(
          (item) => STATUS_COLORS[item.order_status] || FALLBACK_COLOR
        ),
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          padding: 16,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <h2 className="font-semibold mb-4">Orders Status</h2>
      <div className="relative" style={{ height: "280px" }}>
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-semibold">{total}</span>
          <span className="text-xs text-gray-400">Total</span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusChart;