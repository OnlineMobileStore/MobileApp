package com.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.pojo.ProductImage;

public interface ProductImageDao extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findByProductId(Long productId);
}
