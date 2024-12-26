// src/admin/components/SalesGraph.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SalesGraph = () => {
  // Static data for the chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Online Sales",
        data: [4000, 5000, 6000, 7000, 8000, 7500, 7200, 8500, 8700, 9000, 9400, 10000],
        borderColor: "#6C5CE7",
        backgroundColor: "rgba(108, 92, 231, 0.2)",
        fill: true,
        tension: 0.4, // Smooth curve
        pointBorderColor: "#6C5CE7",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "Offline Sales",
        data: [3000, 4000, 4500, 4700, 5000, 5200, 5500, 6000, 6500, 6800, 7000, 7200],
        borderColor: "#00CEC9",
        backgroundColor: "rgba(0, 206, 201, 0.2)",
        fill: true,
        tension: 0.4,
        pointBorderColor: "#00CEC9",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
        ticks: {
          stepSize: 2000,
        },
      },
    },
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Sales Performance for Last 12 Months</h5>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesGraph;
