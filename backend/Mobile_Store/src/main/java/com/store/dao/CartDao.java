package com.store.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.store.pojo.Cart;
import com.store.pojo.Customer;

import jakarta.transaction.Transactional;

import java.util.List;


public interface CartDao extends JpaRepository<Cart, Long> {
	
    List<Cart> findByCustomerId(Long customerId);
    
    Optional<Cart> findByCustomerIdAndProductId(Long customerId, Long productId);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Cart c WHERE c.customer = :customer")
    void deleteByCustomer(Customer customer);
    
}
