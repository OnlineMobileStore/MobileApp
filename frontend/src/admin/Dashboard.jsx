// import React, { useState } from "react";
// import AdminNavbar from "./../components/AdminNavbar";

// const AdminDashboard = () => {
//   const [products, setProducts] = useState([
//     { id: 1, name: "Samsung", price: 11000, quantity: 200 },
//     { id: 2, name: "Readme", price: 25000, quantity: 500 },
//     { id: 3, name: "Oppo", price: 7000, quantity: 700 },
//     { id: 4, name: "Realme", price: 15000, quantity: 100 },
//   ]);

//   const handleDelete = (id) => {
//     const updatedProducts = products.filter((product) => product.id !== id);
//     setProducts(updatedProducts);
//   };

//   const handleEdit = (id) => {
//     alert(`Edit product with ID: ${id}`);
//   };

//   const handleAdd = () => {
//     alert("Add new product");
//   };

//   const handleView = (id) => {
//     alert(`View details of product with ID: ${id}`);
//   };

//   return (
//     <div>
//       <AdminNavbar />
//       <div style={{
//           marginLeft: "250px", // Offset the content to the right of the sidebar
//           padding: "20px",
//           height: "calc(100vh)", // Adjust height to account for the top bar
//           overflowY: "auto", // Enable scrolling for the content area
//           backgroundColor: "#f5f5f5",
//   }}>
//         <h1>Welcome to the Admin Panel</h1>
//         <button onClick={handleAdd}>Add New Product</button>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.name}</td>
//                 <td>{product.price}</td>
//                 <td>{product.quantity}</td>
//                 <td>
//                   <button onClick={() => handleView(product.id)}>View</button>
//                   <button onClick={() => handleEdit(product.id)}>Edit</button>
//                   <button onClick={() => handleDelete(product.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import AdminNavbar from "./../components/AdminNavbar";
import TopBar from "../components/TopBar";

const AdminDashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Samsung", price: 11000, quantity: 200 },
    { id: 2, name: "Readme", price: 25000, quantity: 500 },
    { id: 3, name: "Oppo", price: 7000, quantity: 700 },
    { id: 4, name: "Realme", price: 15000, quantity: 100 },
  ]);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
  };

  const handleAdd = () => {
    alert("Add new product");
  };

  const handleView = (id) => {
    alert(`View details of product with ID: ${id}`);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflowY: "auto" }}>
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
          marginLeft: "250px", // Offset for sidebar
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
          <h2 style={{ margin: "0", fontSize: "18px" }}><TopBar/></h2>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            marginTop: "50px", // Space for fixed top bar
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
            Welcome to the Admin Panel
          </h1>
          <button
            onClick={handleAdd}
            style={{
              padding: "10px 15px",
              fontSize: "16px",
              backgroundColor: "#135474",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Add New Product
          </button>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Price</th>
                <th style={tableHeaderStyle}>Quantity</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={rowStyle}>
                  <td style={cellStyle}>{product.name}</td>
                  <td style={cellStyle}>{product.price}</td>
                  <td style={cellStyle}>{product.quantity}</td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => handleView(product.id)}
                      style={actionButtonStyle("view")}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(product.id)}
                      style={actionButtonStyle("edit")}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={actionButtonStyle("delete")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Styling for table headers
const tableHeaderStyle = {
  textAlign: "left",
  padding: "12px",
  backgroundColor: "#135474",
  color: "#fff",
  fontWeight: "bold",
};

// Styling for table rows
const rowStyle = {
  borderBottom: "1px solid #ddd",
};

// Styling for table cells
const cellStyle = {
  padding: "12px",
};

// Styling for action buttons
const actionButtonStyle = (type) => {
  const colors = {
    view: "#28a745",
    edit: "#ffc107",
    delete: "#dc3545",
  };
  return {
    padding: "5px 10px",
    margin: "0 5px",
    border: "none",
    borderRadius: "3px",
    backgroundColor: colors[type],
    color: "#fff",
    cursor: "pointer",
  };
};

export default AdminDashboard;
