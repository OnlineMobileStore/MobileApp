import { useEffect, useState } from "react";
import { getSalesDetails } from "../../services/sales"; // Import the function to fetch sales data
import AdminNavbar from "../../components/AdminNavbar";
import TopBar from "../../components/TopBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const SalesDetailsAdmin = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalesDetails = async () => {
      try {
        const response = await getSalesDetails();
        console.log("API Response:", response); // Log the response to inspect its structure

        if (response && response.data) {
          setSales(response.data);
        } else {
          setError("Unexpected response format.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load sales data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesDetails();
  }, []);

  const handleSaleDetail = (id) => {
    navigate("/sale-details", { state: { id } });
  };

  return (
    <div className="d-flex" style={{ height: "100vh", overflowY: "auto" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#135474",
          color: "#fff",
          position: "fixed",
          top: "0",
          bottom: "0",
          overflowY: "auto",
        }}
      >
        <AdminNavbar />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "250px",
            right: "0",
            height: "50px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: "10",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <h2 style={{ margin: "0", fontSize: "18px" }}>
            <TopBar />
          </h2>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            marginTop: "50px",
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h1 className="fw-bold mb-4">Sales Details</h1>

          {/* Loading & Error Handling */}
          {loading && !error && <p className="text-center">Loading sales data...</p>}
          {error && !loading && <p className="text-center text-danger">{error}</p>}
          {!loading && !error && sales.length === 0 && (
            <p className="text-center">No sales data available at the moment.</p>
          )}

          {/* Sales Data Grid */}
          {!loading && !error && sales?.length > 0 && (
            <div className="container">
              <div className="row">
                {sales.map((sale) => (
                  <div key={sale.id} className="col-md-3 mb-4">
                    <div className="card h-100 shadow-sm border-0">
                      <div className="card-body text-center">
                        <h6 className="card-title fw-bold">{sale.productName}</h6>
                        <p className="text-muted">{sale.date}</p>
                        <p className="fw-bold">${sale.totalPrice.toFixed(2)}</p>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleSaleDetail(sale.id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
