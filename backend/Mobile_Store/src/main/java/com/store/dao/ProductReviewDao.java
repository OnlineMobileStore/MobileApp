package com.store.dao;

import com.store.pojo.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductReviewDao extends JpaRepository<ProductReview, Long> {
    List<ProductReview> findByProductId(Long productId);
}