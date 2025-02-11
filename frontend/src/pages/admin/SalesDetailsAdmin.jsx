import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { FaShoppingCart, FaUndo } from "react-icons/fa";
import AdminNavbar from "../../components/AdminNavbar"; 
import TopBar from "../../components/TopBar"; 
import { Chart as ChartJS, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register required elements
ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesDetailsAdmin = () => {
  // State to hold dynamic data
  const [summaryData, setSummaryData] = useState({
    totalSales: 0,
    profit: 0,
    totalProducts: 0,
  });

  // Fetch data from backend
  useEffect(() => {
    axios.get("http://localhost:8080/sales/summary")
      .then(response => {
        setSummaryData(response.data);
      })
      .catch(error => console.error("Error fetching sales data:", error));
  }, []);

  // Static charts data
  const revenueLineData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      { label: "Online Revenue", data: [400, 500, 600, 700, 800, 900, 1000], borderColor: "#6C5DD3", backgroundColor: "rgba(108, 93, 211, 0.2)", fill: true, tension: 0.4 },
      { label: "Offline Revenue", data: [300, 400, 500, 600, 700, 800, 900], borderColor: "#FF6D28", backgroundColor: "rgba(255, 109, 40, 0.2)", fill: true, tension: 0.4 },
    ],
  };

  const customerBarData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{ label: "Customers", data: [2000, 3000, 2500, 4000], backgroundColor: "#6C5DD3" }],
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflowY: "auto" }}>
      <div style={{ width: "250px", backgroundColor: "#135474", color: "#fff", position: "fixed", top: "0", bottom: "0", overflowY: "auto" }}>
        <AdminNavbar />
      </div>

      <div style={{ marginLeft: "250px", width: "calc(100% - 250px)", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "fixed", top: "0", left: "250px", right: "0", height: "50px", backgroundColor: "#ffffff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", zIndex: "10", display: "flex", alignItems: "center", padding: "0 20px" }}>
          <TopBar />
        </div>

        <div style={{ marginTop: "50px", flex: 1, overflowY: "auto", padding: "20px", backgroundColor: "#f5f5f5" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Sales Analytics</h1>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "20px" }}>
            <div style={{ flex: "1", padding: "20px", borderRadius: "10px", backgroundColor: "#6C5DD3", color: "#fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}><FaShoppingCart /></div>
              <h2 style={{ fontSize: "18px", margin: "0" }}>Total Sales</h2>
              <p style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}>{summaryData.totalSales}</p>
            </div>

            <div style={{ flex: "1", padding: "20px", borderRadius: "10px", backgroundColor: "#FF6D28", color: "#fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}><FaUndo /></div>
              <h2 style={{ fontSize: "18px", margin: "0" }}>Profit</h2>
              <p style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}>{summaryData.profit}</p>
            </div>

            <div style={{ flex: "1", padding: "20px", borderRadius: "10px", backgroundColor: "#2196F3", color: "#fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}><FaShoppingCart /></div>
              <h2 style={{ fontSize: "18px", margin: "0" }}>Products</h2>
              <p style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}>{summaryData.totalProducts}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
            <div style={{ width: "47%", height:"400px", backgroundColor: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <h3>Customers</h3>
              <Bar data={customerBarData} />
            </div>

            <div style={{ width: "47%", height:"400px", backgroundColor: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <h3>Revenue for Last 7 Days</h3>
              <Line data={revenueLineData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetailsAdmin;









// import React from "react";
// import { Line, Bar, Pie } from "react-chartjs-2";
// import { FaShoppingCart, FaUndo, FaDownload } from "react-icons/fa";
// import AdminNavbar from "../../components/AdminNavbar"; // Import AdminNavbar
// import TopBar from "../../components/TopBar"; // Import TopBar
// import {
//   Chart as ChartJS,
//   LineElement,
//   BarElement,
//   PointElement, // Add this
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// // Register required elements
// ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

// const SalesDetailsAdmin = () => {
//   const summaryData = [
//     { title: "TotalSales", value: 59467, icon: <FaShoppingCart />, growth: "3.4%", color: "#6C5DD3" },
//     { title: "Profit", value: 28085, icon: <FaUndo />, growth: "2.5%", color: "#FF6D28" },
//     { title: "Products", value: 39645, icon: <FaShoppingCart />, growth: "3.2%", color: "#2196F3" },
//     // { title: "Downloads", value: 44148, icon: <FaDownload />, growth: "1.2%", color: "#FFC107" },
//   ];

//   const revenueLineData = {
//     labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
//     datasets: [
//       {
//         label: "Online Revenue",
//         data: [400, 500, 600, 700, 800, 900, 1000],
//         borderColor: "#6C5DD3",
//         backgroundColor: "rgba(108, 93, 211, 0.2)",
//         fill: true,
//         tension: 0.4,
//       },
//       {
//         label: "Offline Revenue",
//         data: [300, 400, 500, 600, 700, 800, 900],
//         borderColor: "#FF6D28",
//         backgroundColor: "rgba(255, 109, 40, 0.2)",
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   const customerBarData = {
//     labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
//     datasets: [
//       {
//         label: "Customers",
//         data: [2000, 3000, 2500, 4000],
//         backgroundColor: "#6C5DD3",
//       },
//     ],
//   };

//   const salesPieData = {
//     labels: ["Direct Sales", "Affiliate Sales", "Indirect Sales"],
//     datasets: [
//       {
//         label: "Sales Distribution",
//         data: [67, 20, 12],
//         backgroundColor: ["#6C5DD3", "#FF6D28", "#2196F3"],
//       },
//     ],
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", overflowY: "auto" }}>
//       {/* Sidebar */}
//       <div
//         style={{
//           width: "250px",
//           backgroundColor: "#135474",
//           color: "#fff",
//           position: "fixed",
//           top: "0",
//           bottom: "0",
//           overflowY: "auto",
//         }}
//       >
//         <AdminNavbar />
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           marginLeft: "250px",
//           width: "calc(100% - 250px)",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Top Bar */}
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "250px",
//             right: "0",
//             height: "50px",
//             backgroundColor: "#ffffff",
//             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//             zIndex: "10",
//             display: "flex",
//             alignItems: "center",
//             padding: "0 20px",
//           }}
//         >
//           <TopBar />
//         </div>

//         {/* Scrollable Content */}
//         <div
//           style={{
//             marginTop: "50px", // Space for fixed top bar
//             flex: 1,
//             overflowY: "auto",
//             padding: "20px",
//             backgroundColor: "#f5f5f5",
//           }}
//         >
//           <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Sales Analytics</h1>

//           {/* Summary Cards */}
//           <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "20px" }}>
//             {summaryData.map((item, index) => (
//               <div
//                 key={index}
//                 style={{
//                   flex: "1",
//                   padding: "20px",
//                   borderRadius: "10px",
//                   backgroundColor: item.color,
//                   color: "#fff",
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <div style={{ fontSize: "24px", marginBottom: "10px" }}>{item.icon}</div>
//                 <h2 style={{ fontSize: "18px", margin: "0" }}>{item.title}</h2>
//                 <p style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}>{item.value}</p>
//                 <p style={{ fontSize: "14px", margin: "0" }}>Growth: {item.growth}</p>
//               </div>
//             ))}
//           </div>

//           {/* Charts */}
//           <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
//             {/* Bar Chart */}
//             <div
//              style={{
//               width: "47%", // Full width
//               height:"400px",
//               backgroundColor: "#fff",
//               borderRadius: "10px",
//               padding: "20px",
//               marginBottom: "20px",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//             }}
//             >
//               <h3>Customers</h3>
//               <Bar data={customerBarData} />
//             </div>

//             {/* Revenue Line Chart */}
//             <div
//               style={{
//                 width: "47%", // Full width
//                 height:"400px",
//                 backgroundColor: "#fff",
//                 borderRadius: "10px",
//                 padding: "20px",
//                 marginBottom: "20px",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <h3>Revenue for Last 7 Days</h3>
//               <Line data={revenueLineData} />
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SalesDetailsAdmin;
