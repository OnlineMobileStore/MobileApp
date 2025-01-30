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
import com.store.dto.CartDto;
import com.store.pojo.Cart;
import com.store.service.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/customer/cart")
public class CartContoller {
	
	@Autowired
	private CartService cartService;
	
	
	
	// Controller method for add items to cart
	@PostMapping("/add")
	public ResponseEntity<?> addToCart(@Valid @RequestBody CartDto cartDto){
		System.out.println(cartDto);
		
		ApiResponse updateCart = cartService.addToCart(cartDto);
		
		return ResponseEntity.ok(updateCart);
	}
	
	@DeleteMapping("/{cartId}/remove/{itemId}")
	public ResponseEntity<String> removeCartItem(@PathVariable Long cartId, @PathVariable Long itemId) {
        boolean isRemoved = cartService.removeIteamFromCart(cartId, itemId);
        
        if (isRemoved) {
            return ResponseEntity.ok("Item removed from cart successfully.");
        } else {
            return ResponseEntity.status(404).body("Item not found in cart.");
        }
    }

}
