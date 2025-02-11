package com.store.service;

import java.util.List;

import com.store.dto.ApiResponse;
import com.store.dto.CartDTO;
import com.store.dto.WishlistDto;

public interface WishlistService {
	
	ApiResponse addToWishlist(WishlistDto wishlistDto);
	 List<WishlistDto> getWishlistByCustomer(Long customerId);
	 ApiResponse deletefromWishlistById(Long wishlistId);
	 
}
