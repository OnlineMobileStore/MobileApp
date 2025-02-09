package com.store.controller;
import com.store.dto.CartDTO;
import com.store.dto.ProductDTO;
import com.store.dto.ApiResponse;
import com.store.pojo.Cart;
import com.store.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ApiResponse addToCart(@RequestBody CartDTO cartDto) {
        return cartService.addToCart(cartDto);
    }

    @PatchMapping("/updateQnt/{customerId}")
    public ApiResponse updateCartQuantity(
            @PathVariable Long customerId, 
            @RequestParam Long productId, 
            @RequestParam int quantity) {
        return cartService.updateCartQuantity(customerId, productId, quantity);
    }

    @DeleteMapping("/remove/{customerId}")
    public ApiResponse removeFromCart(
    		@PathVariable Long customerId,
            @RequestParam Long productId) {
        return cartService.removeFromCart(customerId, productId);
    }
    
    @DeleteMapping("/removeAll/{customerId}")
    public ApiResponse removeAllFromCart(
    		@PathVariable Long customerId) {
        return cartService.emptyCart(customerId);
    }
    
    @GetMapping("/{customerId}")
    public ResponseEntity<?> getCartItems(@PathVariable Long customerId){
		List<CartDTO> cartItems=cartService.getCartProductsByCustomerId(customerId);
		if(cartItems.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    	return ResponseEntity.ok(cartItems);
	}
}
