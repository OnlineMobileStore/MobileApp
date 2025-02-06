import React from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./DeleteProduct.module.css";
import { deleteProduct } from "../../services/product";

const DeleteProduct = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };
  const handleDelete = async() => {
    try {
          const result = await deleteProduct(id);
          console.log(result);
          if (result.status === 200) {
            toast.success("Successfully deleted the product");
            navigate(-1);
          } else {
            toast.error(result.data.message || "Failed to delete product");
          }
        } catch (error) {
          toast.error("Failed to update product");
          console.error("Error updating product:", error);
        }
  };
  return (
    <div className={styles.container}>
      <div className={styles.deletediv}>
        <div id={styles.head}>Are you sure you want to Delete?</div>
        <div id={styles.deletebut}>
          <button onClick={handleDelete}>Yes, Delete</button>
        </div>
        <div id={styles.cancelbut}>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
