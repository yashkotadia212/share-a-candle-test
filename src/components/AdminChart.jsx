import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BAR_SIZE = 8;
// Sample data for the chart
const data = [
  { month: "Jan", totalOrders: 400, totalSales: 2400, totalEarnings: 2000 },
  { month: "Feb", totalOrders: 300, totalSales: 1500, totalEarnings: 1200 },
  { month: "Mar", totalOrders: 500, totalSales: 3000, totalEarnings: 2500 },
  { month: "Apr", totalOrders: 450, totalSales: 2500, totalEarnings: 2200 },
  { month: "May", totalOrders: 700, totalSales: 3500, totalEarnings: 3000 },
  { month: "Jun", totalOrders: 600, totalSales: 3200, totalEarnings: 2700 },
  { month: "Jul", totalOrders: 650, totalSales: 3400, totalEarnings: 2900 },
  { month: "Aug", totalOrders: 700, totalSales: 3600, totalEarnings: 3100 },
  { month: "Sep", totalOrders: 750, totalSales: 3700, totalEarnings: 3200 },
  { month: "Oct", totalOrders: 800, totalSales: 3800, totalEarnings: 3300 },
  { month: "Nov", totalOrders: 850, totalSales: 4000, totalEarnings: 3400 },
  { month: "Dec", totalOrders: 900, totalSales: 4200, totalEarnings: 3600 },
];

const AdminChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%" maxHeight={500}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend iconType="circle" verticalAlign="top" align="left" />
        <Bar
          barSize={BAR_SIZE}
          dataKey="totalOrders"
          fill="#7222E6"
          name="Total Orders"
        />
        <Bar
          barSize={BAR_SIZE}
          dataKey="totalSales"
          fill="#47C659"
          name="Total Sales"
        />
        <Bar
          barSize={BAR_SIZE}
          dataKey="totalEarnings"
          fill="#3F7AFB"
          name="Total Earnings"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AdminChart;
