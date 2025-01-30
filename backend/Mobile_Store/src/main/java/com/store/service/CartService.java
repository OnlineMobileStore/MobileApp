package com.store.service;

import com.store.dto.ApiResponse;
import com.store.dto.CartDto;
import com.store.pojo.Cart;

public interface CartService {
	
	ApiResponse addToCart(CartDto cartDto);
	
	boolean removeIteamFromCart(Long cartId, Long itemId);

}
