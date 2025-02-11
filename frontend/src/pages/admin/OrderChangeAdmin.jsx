
import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import TopBar from "../../components/TopBar";
import styles from "../../styles/ViewOrders.module.css";
import { toast } from "react-toastify";
import { changeOrderStatus, getAllCustomersOrders } from "../../services/order";

const OrderChangeAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response =await getAllCustomersOrders();
        if (response.data.status === "success") {
          const formattedOrders = response.data.data.flatMap((customer) =>
            customer.orders.map((order) => ({
              id: order.id,
              customer: `${customer.customerName}`,
              date: order.createdOn
                ? new Date(order.createdOn).toLocaleDateString()
                : "N/A",
              status: order.status,
              total: `₹${order.totalAmount.toFixed(2)}`,
            })) || []
          );
          setOrders(formattedOrders);
        } else {
          setError("Failed to fetch orders.");
        }
      } catch (error) {
        setError("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const response = await changeOrderStatus(orderId,newStatus);
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("order status updated! ")
      } else {
        toast.error("failed to update!")
        setError("Failed to update status.");
      }
    } catch (error) {
      setError("An error occurred while updating the order status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <AdminNavbar />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.topBar}>
          <TopBar />
        </div>

        <div className={styles.scrollableContent}>
          <h1 className={styles.pageTitle}>Orders</h1>

          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Order ID</th>
                  <th className={styles.tableHeader}>Customer</th>
                  <th className={styles.tableHeader}>Date</th>
                  <th className={styles.tableHeader}>Status</th>
                  <th className={styles.tableHeader}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className={styles.row}>
                    <td className={styles.cell}>{order.id}</td>
                    <td className={styles.cell}>{order.customer}</td>
                    <td className={styles.cell}>{order.date}</td>
                    <td className={styles.cell}>
                     <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={{
                          backgroundColor:
                            order.status === "Delivered"
                              ? "#28a745"
                              : order.status === "Shipped"
                              ? "#ffc107"
                              : order.status === "Out for Delivery"
                              ? "#ff8c00"
                              : order.status === "Cancelled"
                              ? "#dc3545"
                              : "#007bff",
                          color: "white",
                          padding: "6px",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out</option>
                        <option value="Delivered">Delivered</option>
                        
                        
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className={styles.cell}>{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderChangeAdmin;

