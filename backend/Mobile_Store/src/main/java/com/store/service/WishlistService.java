package com.store.service;

import com.store.dto.ApiResponse;
import com.store.dto.WishlistDto;

public interface WishlistService {
	
	 String addToWishlist(WishlistDto wishlistDto);
	 
	 ApiResponse deletefromWishlistById(Long wishlistIdid);

}
