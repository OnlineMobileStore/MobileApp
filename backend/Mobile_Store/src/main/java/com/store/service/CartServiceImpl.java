package com.store.service;

import com.store.dao.CartDao;
import com.store.dao.CustomerDao;
import com.store.dao.ProductDao;
import com.store.dto.CartDTO;
import com.store.dto.ApiResponse;
import com.store.pojo.Cart;
import com.store.pojo.Customer;
import com.store.pojo.Product;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private CustomerDao customerDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ApiResponse addToCart(CartDTO cartDto) {
        Optional<Customer> customer = customerDao.findById(cartDto.getCustomerId());
        Optional<Product> product = productDao.findById(cartDto.getProductId());

        if (customer.isEmpty() || product.isEmpty()) {
            return new ApiResponse("error", "Invalid customer or product ID");
        }

        Optional<Cart> existingCart = cartDao.findByCustomerIdAndProductId(cartDto.getCustomerId(), cartDto.getProductId());

        if (existingCart.isPresent()) {
            return new ApiResponse("error", "Product already in cart");
        }

        Cart cart = new Cart();
        cart.setCustomer(customer.get());
        cart.setProduct(product.get());
        cart.setQuantity(cartDto.getQuantity());
        cart.setPrice(cartDto.getPrice() * cartDto.getQuantity());

        cartDao.save(cart);
        return new ApiResponse("success", "Item added to cart", cart);
    }

    @Override
    public ApiResponse updateCartQuantity(Long customerId, Long productId, int quantity) {
        Optional<Cart> cart = cartDao.findByCustomerIdAndProductId(customerId, productId);

        if (cart.isEmpty()) {
            return new ApiResponse("error", "Product not found in cart");
        }

        Cart cartItem = cart.get();
        cartItem.setQuantity(quantity);
        cartItem.setPrice(cart.get().getPrice() * quantity);
        
        

        cartDao.save(cartItem);
        return new ApiResponse("success", "Cart updated");
    }

    @Override
    public ApiResponse removeFromCart(Long customerId, Long productId) {
        Optional<Cart> cart = cartDao.findByCustomerIdAndProductId(customerId, productId);

        if (cart.isEmpty()) {
            return new ApiResponse("error", "Product not found in cart");
        }

        cartDao.delete(cart.get());
        return new ApiResponse("success", "Item removed from cart");
    }

    @Override
    public List<CartDTO> getCartProductsByCustomerId(Long customerId) {
        return cartDao.findByCustomerId(customerId)
        		.stream()
        		.map(cart->{
        			CartDTO dto=modelMapper.map(cart, CartDTO.class);
        			dto.setCustomerId(cart.getCustomer().getId());
                    dto.setProductId(cart.getProduct().getId()); 
                    dto.setProductName(cart.getProduct().getTitle());
                    dto.setProductImage(cart.getProduct().getPrimaryImage());
                    dto.setDiscount(cart.getProduct().getDiscount());
                    dto.setOprice(cart.getProduct().getPrice());
                    dto.setProductQuantity(cart.getProduct().getQuantity());
                    
        			return dto;
        		}).collect(Collectors.toList());
    }
    
    @Override
    public ApiResponse emptyCart(Long customerId) {
        Optional<Customer> customer = customerDao.findById(customerId);
        
        if (!customer.isPresent()) {
            return new ApiResponse("error", "Customer not found");
        }
        
        // Delete the cart items associated with the customer
        cartDao.deleteByCustomer(customer.get());

        return new ApiResponse("success", "Cart has been emptied successfully.");
    }
    
}
