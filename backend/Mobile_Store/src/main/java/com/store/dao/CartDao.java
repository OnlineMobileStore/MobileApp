package com.store.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.pojo.Cart;
import com.store.pojo.Customer;

import java.util.List;


public interface CartDao extends JpaRepository<Cart, Long> {
	
	
	Optional<Cart> findByCustomer(Customer customer);
    
}
