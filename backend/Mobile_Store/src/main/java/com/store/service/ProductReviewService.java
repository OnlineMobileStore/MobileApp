package com.store.service;

import com.store.dto.ProductReviewReqDTO;
import com.store.dto.ProductReviewRespDTO;
import java.util.List;

public interface ProductReviewService
{
	
    ProductReviewRespDTO addReview(ProductReviewReqDTO dto);
    List<ProductReviewRespDTO> getReviewsByProduct(Long productId);
    
}
