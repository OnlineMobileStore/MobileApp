import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./DeleteProduct.module.css";

const DeleteProduct = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };
  const handleDelete = () => {
    navigate(-1);
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
