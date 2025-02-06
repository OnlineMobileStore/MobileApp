import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import TopBar from "../../components/TopBar";
import { getAllProducts } from "../../services/product";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  // Fetch products from backend when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  const handleEdit = (id) => {
    navigate("/edit-product", { state: { id } });
  };

  const handleDelete = (id) => {
    navigate("/delete-product", { state: { id } });
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleAddBrand = () => {
    navigate("/add-brand");
  };

  const handleView = (id) => {
    navigate("/product-details", { state: { id } });
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
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Welcome to the Admin Panel
          </h1>
          <button
            onClick={handleAddProduct}
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

          <button
            onClick={handleAddBrand}
            style={{
              padding: "10px 15px",
              fontSize: "16px",
              backgroundColor: "#135474",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "20px",
              marginLeft:"50px"
            }}
          >
            Add New Brand
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
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} style={rowStyle}>
                    <td style={cellStyle}>
                      {product.title.length > 20
                        ? product.title.slice(0, 20) + "..."
                        : product.title}
                    </td>
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No products available
                  </td>
                </tr>
              )}
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
