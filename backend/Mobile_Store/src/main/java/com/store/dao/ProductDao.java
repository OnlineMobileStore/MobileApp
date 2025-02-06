package com.store.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.pojo.Product;

public interface ProductDao extends JpaRepository<Product, Long> {
	
	List<Product> findByIsActiveTrue();

    Optional<Product> findByIdAndIsActiveTrue(Long id);

    List<Product> findTop3ByOrderByCreatedOnDesc();
	
}

