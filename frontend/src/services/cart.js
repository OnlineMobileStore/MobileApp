import axios from 'axios'
import { createUrl } from '../util'

export const addToCart = async (customerId,productId,price,
  ) => {
  try {
    const body={customerId: parseInt(customerId),productId: productId,quantity: 1,price: price,}
    const url = createUrl(`customer/cart/add`)
    const response = await axios.post(url,body)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const getCartItems = async (customerId) => {
    try {
      const url = createUrl(`customer/cart/${customerId}`)
      const response = await axios.get(url)
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  };


  export const updateCartQuantity = async (customerId, productId, quantity) => {
    try {
        const url = createUrl(`customer/cart/updateQnt/${customerId}?productId=${productId}&quantity=${quantity}`)
      const response = await axios.patch(url);
      return response.data;
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      throw error;
    }
  };

  export const removeFromCart = async (customerId, productId) => {
    try {
        const url = createUrl(`customer/cart/remove/${customerId}?productId=${productId}`)
      const response = await axios.delete(url);
      return response;
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      throw error;
    }
  };

  