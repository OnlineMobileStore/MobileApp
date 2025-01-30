package com.store.service;

import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.dao.CartDao;
import com.store.dao.CartItemDao;
import com.store.dao.CustomerDao;
import com.store.dao.ProductDao;
import com.store.dto.ApiResponse;
import com.store.dto.CartDto;
import com.store.pojo.Cart;
import com.store.pojo.CartItem;
import com.store.pojo.Customer;
import com.store.pojo.Product;



@Service
@Transactional
public class CartServiceImpl implements CartService {

	@Autowired
	private  CartDao cartDao;
	
	@Autowired
	private CartItemDao cartItemDao;
	
	@Autowired
	private  CustomerDao customerDao;
	
	@Autowired
	private ProductDao productDao;
	@Autowired
	private  ModelMapper modelMapper;
	
	
	@Override
	public ApiResponse addToCart(CartDto cartDto) {
	    // Validate Customer
	    Customer customer = customerDao.findById(cartDto.getCustomerId())
	            .orElseThrow(() -> new RuntimeException("Customer not found"));
	    Product product = productDao.findById(cartDto.getProductId())
	            .orElseThrow(() -> new RuntimeException("Product not found"));
	    System.out.println(product);

	    // Fetch existing cart or create a new one
	    Optional<Cart> existingCart = cartDao.findByCustomer(customer);
	    Cart cart = existingCart.orElseGet(() -> {
	        Cart newCart = new Cart();
	        newCart.setCustomer(customer);
	        newCart.setProduct(product);
	        newCart.setQuantity(cartDto.getQuantity());
	        //newCart.se(cartDto.getPrice());
	        
	        System.out.println(newCart);
	        
	        return cartDao.save(newCart); // Save the new cart if none exists
	    });

	    // Log the CartDto content for debugging
	    System.out.println("CartDto: " + cartDto);

	    // Ensure productId is present in CartDto and add the product to the cart
	    if (cartDto.getProductId() == null) {
	        throw new RuntimeException("Product ID cannot be null");
	    }

	    // Fetch the product by its ID
	  

	    System.out.println("Fetched Product: " + product);

	    // Use ModelMapper to map CartDto to CartItem
	    CartItem cartItem = modelMapper.map(cartDto, CartItem.class);

	    // Set the cart and product manually (since ModelMapper does not know about these relationships)
	    cartItem.setCart(cart);
	    cartItem.setProduct(product);
	    cartItem.setPrice(product.getPrice());
	 //   cartItem.setQuantity(cartDto.getQuantity());
	    
	    // Log the CartItem being saved for debugging
	    System.out.println("Saving CartItem: " + cartItem);

	    // Save the CartItem
	    cartItemDao.save(cartItem);

	    // Return the updated cart (with added product)
	    return new ApiResponse("successs","iteam saved in cart");
	}






	@Override
	public boolean removeIteamFromCart(Long cartId, Long itemId) {
		CartItem cartItem = cartItemDao.findByIdAndCartId(itemId, cartId);
		if(cartItem != null) {
			cartItemDao.delete(cartItem);
			return true;
		}
		return false;
	}

}
