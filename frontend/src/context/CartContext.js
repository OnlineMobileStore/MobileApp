import { createContext, useContext, useState, useEffect } from "react";
import { getCartItems as fetchCart, addToCart as addCart,updateCartQuantity as updateQty, removeFromCart as removeItem } from "../services/cart";
import { toast } from "react-toastify";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const customerId = localStorage.getItem("customerId");
  const [cartItems, setCartItems] = useState([]);

// const fetchCartItems = async () => {
  //   if (!customerId) return;
  //   try {
  //     const response= await getCartItems(customerId);
  //     const cartProductIds = new Set(response.data.map((item) => item.productId));
  //     setCartItems((prevCartItems) => new Set([...prevCartItems, ...cartProductIds]));
  //   } catch (error) {
  //     console.error("Error fetching cart data:", error);
  //   }
  // };

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!customerId) return;
    try {
      const response = await fetchCart(customerId);
      setCartItems(response.data);
    //   const cartProductIds = new Set(response.data.map((item) => item.productId));
    //   setCartItems((prevCartItems) => new Set([...prevCartItems, ...cartProductIds]));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [customerId]);

  const addToCart= async(productId,price)=>{
    try {
      const response = await addCart(customerId,productId,price) 
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
  }
  // Update cart quantity
  const updateCartQuantity = async (productId, quantity) => {
    try {
      const response = await updateQty(customerId, productId, quantity);
      if (response.status === "success") {
        fetchCartItems(); // Refresh cart
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await removeItem(customerId, productId);
      if (response.data.status === "success") {
        fetchCartItems(); // Refresh cart
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems, addToCart,updateCartQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
