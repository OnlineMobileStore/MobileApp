import { createContext, useContext, useState, useEffect } from "react";
import { getCartItems as fetchCart, addToCart as addCart } from "../services/cart";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const customerId = localStorage.getItem("customerId");
  const [cartItems, setCartItems] = useState(new Set());

  const fetchCartItems = async () => {
    if (!customerId) return;
    try {
      const response = await fetchCart(customerId);
      const cartProductIds = new Set(response.data.map((item) => item.productId));
      setCartItems(cartProductIds);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleAddToCart = async (productId, price) => {
    if (!customerId) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await addCart(customerId, productId, price);
      if (response.status === 200) {
        toast.success("Item added to cart!");
        fetchCartItems();
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [customerId]);

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
