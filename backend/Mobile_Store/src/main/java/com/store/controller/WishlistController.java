package com.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.ApiResponse;
import com.store.dto.WishlistDto;
import com.store.service.WishlistService;

@RestController
@RequestMapping("/customer/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/add")
    public ResponseEntity<?> addToWishlist(@RequestBody WishlistDto wishlistDto) {
        String result = wishlistService.addToWishlist(wishlistDto);
        return ResponseEntity.ok(result);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long id){
    	ApiResponse result =wishlistService.deletefromWishlistById(id);
		return ResponseEntity.ok(result);
    	
    }
}
