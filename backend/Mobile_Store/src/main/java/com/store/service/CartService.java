package com.store.service;

import java.util.List;

import com.store.dto.ApiResponse;
import com.store.dto.CartDTO;

public interface CartService {
	
	ApiResponse addToCart(CartDTO cartDto);
    ApiResponse updateCartQuantity(Long customerId, Long productId, int quantity);
    ApiResponse removeFromCart(Long customerId, Long productId);
    List<CartDTO> getCartProductsByCustomerId(Long customerId);
	ApiResponse emptyCart(Long customerId);

}
