import { createUrl } from '../util';
import axios from 'axios'


export const addToWishlist = async (customerId, productId) => {
  try {
    const url = createUrl(`customer/wishlist/add`)
    const response = await axios.post(url, {
      customerId,
      productId
    }, {
      headers: { 'Content-Type': 'application/json' }
    })
    console.log("added",response.data)
    return response.data; 
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const getWishlist = async (customerId) => {
  try {
    const url = createUrl(`customer/wishlist/${customerId}`);
    const response = await axios.get(url);
    // console.log("wishlist",response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error.response?.data || error.message);
    return [];
  }
};

export const removeFromWishlist = async (wishlistId) => {
  try {
    const url = createUrl(`customer/wishlist/${wishlistId}`);
    await axios.delete(url);
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};
