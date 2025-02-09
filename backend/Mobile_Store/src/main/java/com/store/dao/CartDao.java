package com.store.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.dto.CartDTO;
import com.store.pojo.Cart;

import java.util.List;


public interface CartDao extends JpaRepository<Cart, Long> {
	
    List<Cart> findByCustomerId(Long customerId);
    
    Optional<Cart> findByCustomerIdAndProductId(Long customerId, Long productId);
    
}
