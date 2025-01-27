import React from "react";

const Cart = () => {
  const cartItems = [
    { id: 1, name: "Mobile A", price: "$300", quantity: 1 },
    { id: 2, name: "Mobile B", price: "$400", quantity: 2 },
  ];

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price.slice(1) * item.quantity, 0);

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
