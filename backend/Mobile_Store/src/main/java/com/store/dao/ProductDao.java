package com.store.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.pojo.Product;

public interface ProductDao extends JpaRepository<Product, Long> {
	
	// to get all active /available product
	List<Product> findByIsActiveTrue();

	//to soft deletion of product 
    Optional<Product> findByIdAndIsActiveTrue(Long id);
	
}

