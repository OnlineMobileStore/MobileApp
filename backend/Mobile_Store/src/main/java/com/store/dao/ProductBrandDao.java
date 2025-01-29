package com.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.pojo.ProductBrand;


public interface ProductBrandDao extends JpaRepository<ProductBrand, Long> {
	
	}


