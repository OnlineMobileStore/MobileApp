package com.store.service;

import com.store.dto.ProductRatingStatsDTO;
import com.store.dto.ProductReviewDTO;
import java.util.List;

public interface ProductReviewService
{
	
    ProductReviewDTO addReview(ProductReviewDTO dto);
    List<ProductReviewDTO> getReviewsByProduct(Long productId);
	Double getAverageRating(Long productId);
	ProductRatingStatsDTO getRatingStats(Long productId);
    
}
