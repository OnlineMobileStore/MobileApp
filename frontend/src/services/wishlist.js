import { createUrl } from '../util';

export const WishlistService = {
  async getWishlist(customerId) {
    try {
      const response = await fetch(createUrl(`customer/${customerId}/wishlist`));
      if (!response.ok) throw new Error('Failed to fetch wishlist');
      return await response.json();
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return [];
    }
  },

  async addToWishlist(customerId, productId) {
    try {
      const response = await fetch(createUrl('customer/wishlist/add'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, productId }),
      });
      return await response.text();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  },

  async removeFromWishlist(wishlistId) {
    try {
      const response = await fetch(createUrl(`customer/wishlist/${wishlistId}`), {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  }
};
