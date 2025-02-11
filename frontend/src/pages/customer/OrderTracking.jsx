// import React, { useEffect, useState } from "react";
// import styles from "../../styles/OrderTracking.module.css";
// import Navbar from "../../components/Navbar";
// import { getProductById } from "../../services/product";
// import { getOrderDetails } from "../../services/order";

// const OrderTracking = () => {
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState({});
//   const customerId = localStorage.getItem("customerId");

//   const orderStages = [
//     "Placed",
//     "Shipped",
//     "Out for Delivery",
//     "Delivered",
//     "Cancelled",
//   ];

//   useEffect(() => {
//     if (!customerId) return;

//     const fetchOrders = async () => {
//       try {
//         const response = await getOrderDetails(customerId);
//         if (response.data.status === "success") {
//           setOrders(response.data.data);
//           fetchProductDetails(response.data.data);
//         } else {
//           setOrders([]);
//           console.error("No orders found:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, [customerId]);

//   const fetchProductDetails = async (orders) => {
//     // const productIds = [
//     //   ...new Set(
//     //     orders.flatMap((order) => order.items.map((item) => item.productId))
//     //   ),
//     // ];

//     const productIds = [
//       ...new Set(
//         (orders ?? []).flatMap((order) => 
//           (order.items ?? []).map((item) => item.productId)
//         )
//       ),
//     ];

//     try {
//       const responses = await Promise.all(
//         productIds.map((id) =>
//           getProductById(id)
//         )
//       );

//       const productData = {};
//       responses.forEach((res) => {
//         productData[res.data.id] = {
//           title: res.data.title,
//           primaryImage: res.data.primaryImage,
//         };
//       });

//       setProducts(productData);
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//     }
//   };

//   const handleGiveRating = () => {
//     alert(`Redirect to rating page for Order ID: `);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className={styles.container}>
//         <h2 className={styles.pageTitle}>My Orders</h2>

//         {orders.length === 0 ? (
//           <p className={styles.noOrders}>No orders found.</p>
//         ) : (
//           orders.map((order) => {
//             const activeIndex = orderStages.indexOf(order.status);

//             return (
//               <div key={order.orderId} className={styles.orderCard}>
//                 <div className={styles.orderHeader}>
//                   <h4 className={styles.orderId}>Order ID: {order.orderId}</h4>
//                   <div className={styles.deliveredRow}>
//                     <div>
//                       <strong>Status:</strong>{" "}
//                       <span
//                         className={`${styles.status} ${
//                           styles[order.status.toLowerCase()]
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </div>
//                     <div
//                       style={{
//                         display:
//                           order.status === "Delivered" ? "block" : "none",
//                       }}
//                     >
//                       <button className={styles.ratingBut} onClick={() => handleGiveRating()}>Give Rating</button>
//                     </div>
//                   </div>
//                   <div>
//                     <strong>Payment:</strong> {order.paymentMethod}
//                   </div>
//                   <div>
//                     <strong>Total Amount:</strong> ₹{order.totalAmount}
//                   </div>
//                   <p>
//                     <strong>Updated On:</strong>{" "}
//                     {new Date(order.updatedOn).toLocaleString()}
//                   </p>
//                 </div>

//                 <div className={styles.progressContainer}>
//                   {orderStages.map((stage, index) => (
//                     <div key={index} className={styles.stepWrapper}>
//                       {index > 0 && (
//                         <div
//                           className={`${styles.line} ${
//                             index <= activeIndex ? styles.lineActive : ""
//                           }`}
//                         ></div>
//                       )}
//                       <div
//                         className={`${styles.circle} ${
//                           index <= activeIndex ? styles.circleActive : ""
//                         }`}
//                       >
//                         {index + 1}
//                       </div>
//                       <p className={styles.stepLabel}>{stage}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className={styles.itemsContainer}>
//                   {order.items.map((item, index) => (
//                     <div key={index} className={styles.itemCard}>
//                       <div>
//                         <img
//                           src={products[item.productId]?.primaryImage}
//                           alt={products[item.productId]?.title}
//                           className={styles.productImage}
//                           width={50}
//                           height={50}
//                         />
//                       </div>
//                       <div>
//                         {products[item.productId]?.title || "Loading..."}
//                       </div>
//                       <div>
//                         ProductId:<strong> {item.productId}</strong>
//                       </div>
//                       <div>
//                         Quantity:<strong> {item.quantity}</strong>
//                       </div>
//                       <div>
//                         Price:<strong> ₹{item.price}</strong>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderTracking;


import React, { useEffect, useState } from "react";
import styles from "../../styles/OrderTracking.module.css";
import Navbar from "../../components/Navbar";
import { getProductById } from "../../services/product";
import { getOrderDetails } from "../../services/order";
import { useNavigate } from "react-router-dom";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const customerId = localStorage.getItem("customerId");
  const navigate = useNavigate();

  const orderStages = ["Placed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

  useEffect(() => {
    if (!customerId) return;

    const fetchOrders = async () => {
      try {
        const response = await getOrderDetails(customerId);
        if (response.data.status === "success" && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
          fetchProductDetails(response.data.data);
        } else {
          setOrders([]);
          console.error("No orders found:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Ensure it's an array
      }
    };

    fetchOrders();
  }, [customerId]);

  const fetchProductDetails = async (orders) => {
    if (!orders || orders.length === 0) return;

    const productIds = [
      ...new Set(
        (orders ?? []).flatMap((order) => (order.items ?? []).map((item) => item.productId))
      ),
    ];

    try {
      const responses = await Promise.all(productIds.map((id) => getProductById(id)));

      const productData = {};
      responses.forEach((res) => {
        if (res?.data) {
          productData[res.data.id] = {
            title: res.data.title,
            primaryImage: res.data.primaryImage || "default-image.jpg",
          };
        }
      });

      setProducts(productData);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleGiveRating = () => {
    navigate('/add-review');
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.pageTitle}>My Orders</h2>

        {orders.length === 0 ? (
          <p className={styles.noOrders}>No orders found.</p>
        ) : (
          orders.map((order) => {
            const activeIndex = orderStages.indexOf(order.status);

            return (
              <div key={order.orderId} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <h4 className={styles.orderId}>Order ID: {order.orderId}</h4>
                  <div className={styles.deliveredRow}>
                    <div>
                      <strong>Status:</strong>{" "}
                      <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                    </div>
                    {order.status === "Delivered" && (
                      <button className={styles.ratingBut} onClick={() => handleGiveRating(order.orderId)}>
                        Give Rating
                      </button>
                    )}
                  </div>
                  <div>
                    <strong>Payment:</strong> {order.paymentMethod}
                  </div>
                  <div>
                    <strong>Total Amount:</strong> ₹{order.totalAmount}
                  </div>
                  <p>
                    <strong>Updated On:</strong> {new Date(order.updatedOn).toLocaleString()}
                  </p>
                </div>

                <div className={styles.progressContainer}>
                  {orderStages.map((stage, index) => (
                    <div key={index} className={styles.stepWrapper}>
                      {index > 0 && (
                        <div
                          className={`${styles.line} ${index <= activeIndex ? styles.lineActive : ""}`}
                        ></div>
                      )}
                      <div className={`${styles.circle} ${index <= activeIndex ? styles.circleActive : ""}`}>
                        {index + 1}
                      </div>
                      <p className={styles.stepLabel}>{stage}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.itemsContainer}>
                  {(order.items ?? []).map((item, index) => {
                    const product = products[item.productId] || { title: "Loading...", primaryImage: "default-image.jpg" };

                    return (
                      <div key={index} className={styles.itemCard}>
                        <div>
                          <img
                            src={product.primaryImage}
                            alt={product.title}
                            className={styles.productImage}
                            width={50}
                            height={50}
                          />
                        </div>
                        <div>{product.title}</div>
                        <div>
                          ProductId:<strong> {item.productId}</strong>
                        </div>
                        <div>
                          Quantity:<strong> {item.quantity}</strong>
                        </div>
                        <div>
                          Price:<strong> ₹{item.price}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
