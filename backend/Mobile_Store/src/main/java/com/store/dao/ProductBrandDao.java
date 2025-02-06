package com.store.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.pojo.ProductBrand;


public interface ProductBrandDao extends JpaRepository<ProductBrand, Long> {

	Optional<ProductBrand> findByTitle(String brand_name);

	
	}
