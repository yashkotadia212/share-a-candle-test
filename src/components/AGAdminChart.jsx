import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";

const CORNER_RADIUS = 15;

const AGAdminChart = () => {
  const [options, setOptions] = useState({
    // Data: Data to be displayed in the chart
    theme: {
      palette: {
        overrides: {},
      },
    },
    legend: {
      position: "top",
      item: {
        paddingX: 32,
        paddingY: 8,
        marker: {
          size: 10,
          shape: "circle", // 'circle', 'square', 'cross', 'plus', 'triangle'
        },
      },
    },
    data: [
      { month: "Jan", totalOrders: 400, totalSales: 2400, totalEarnings: 2000 },
      { month: "Feb", totalOrders: 300, totalSales: 1500, totalEarnings: 1200 },
      { month: "Mar", totalOrders: 500, totalSales: 3000, totalEarnings: 2500 },
      { month: "Apr", totalOrders: 450, totalSales: 2500, totalEarnings: 2200 },
      { month: "May", totalOrders: 700, totalSales: 3500, totalEarnings: 3000 },
      { month: "Jun", totalOrders: 600, totalSales: 3200, totalEarnings: 2700 },
      { month: "Jul", totalOrders: 650, totalSales: 3400, totalEarnings: 2900 },
      { month: "Aug", totalOrders: 700, totalSales: 3600, totalEarnings: 3100 },
      //   { month: "Sep", totalOrders: 750, totalSales: 3700, totalEarnings: 3200 },
      //   { month: "Oct", totalOrders: 800, totalSales: 3800, totalEarnings: 3300 },
      //   { month: "Nov", totalOrders: 850, totalSales: 4000, totalEarnings: 3400 },
      //   { month: "Dec", totalOrders: 900, totalSales: 4200, totalEarnings: 3600 },
    ],
    // Series: Defines which chart type and data to use
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "totalOrders",
        fill: "#7222E6",
        yName: "Total Orders",
        cornerRadius: CORNER_RADIUS,
      },
      {
        type: "bar",
        xKey: "month",
        yKey: "totalSales",
        fill: "#47C659",
        yName: "Total Sales",
        cornerRadius: CORNER_RADIUS,
      },
      {
        type: "bar",
        xKey: "month",
        yKey: "totalEarnings",
        fill: "#3F7AFB",
        yName: "Total Earnings",
        cornerRadius: CORNER_RADIUS,
      },
    ],
  });

  return <AgCharts options={options} />;
};

export default AGAdminChart;
