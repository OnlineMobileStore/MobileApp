package com.store.dao;

import com.store.dto.ProductRatingStatsDTO;
import com.store.pojo.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductReviewDao extends JpaRepository<ProductReview, Long> {
    List<ProductReview> findByProductId(Long productId);
    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM ProductReview r WHERE r.product.id = :productId")
    Double findAverageRatingByProductId(@Param("productId") Long productId);
    
    @Query(value = """
    	    SELECT 
    	        COUNT(CASE WHEN r.rating = 1 THEN 1 END) AS oneStar,
    	        COUNT(CASE WHEN r.rating = 2 THEN 1 END) AS twoStars,
    	        COUNT(CASE WHEN r.rating = 3 THEN 1 END) AS threeStars,
    	        COUNT(CASE WHEN r.rating = 4 THEN 1 END) AS fourStars,
    	        COUNT(CASE WHEN r.rating = 5 THEN 1 END) AS fiveStars,
    	        COUNT(r.rating) AS totalReviews,
    	        COALESCE(AVG(r.rating), 0) AS averageRating
    	    FROM product_review r 
    	    WHERE r.product_id = :productId;
    	""", nativeQuery = true)
    List<Object[]> findRatingDistributionByProductId(@Param("productId") Long productId);
    
    @Query("SELECT AVG(r.rating) FROM ProductReview r WHERE r.product.id = :productId")
    Double getAverageRatingForProduct(@Param("productId") Long productId);
}
