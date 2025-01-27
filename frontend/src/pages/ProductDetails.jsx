import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const product = {
    id,
    name: `Mobile ${id}`,
    price: `$${300 + id * 50}`,
    description: "This is a great mobile with excellent features.",
    image: `/images/mobile-${id}.jpg`,
  };

  return (
    <div >
      <h1>Pro details</h1>
    </div>
  );
};

export default ProductDetails;
