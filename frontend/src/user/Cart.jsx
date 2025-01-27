import React from "react";

const Cart = () => {
  const items = [
    { id: 1, name: "Mobile A", price: 300 },
    { id: 2, name: "Mobile B", price: 400 },
  ];

  return (
    <div className="container mt-5">
      <h2>My Cart</h2>
      {items.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <h5>{item.name}</h5>
            <p>Price: ${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
