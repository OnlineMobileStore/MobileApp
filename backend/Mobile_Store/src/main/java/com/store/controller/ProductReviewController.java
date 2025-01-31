package com.store.controller;

import com.store.dto.ProductRatingStatsDTO;
import com.store.dto.ProductReviewDTO;
import com.store.service.ProductReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductReviewController {
    private final ProductReviewService productReviewService;

    @PostMapping
    public ResponseEntity<ProductReviewDTO> addReview(@Valid @RequestBody ProductReviewDTO dto) {
        return ResponseEntity.ok(productReviewService.addReview(dto));
    }
    
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductReviewDTO>> getReviews(@PathVariable Long productId) {
    	
        return ResponseEntity.ok(productReviewService.getReviewsByProduct(productId));
        
    }
    
    @GetMapping("/average-rating/{productId}")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long productId) {
        Double averageRating = productReviewService.getAverageRating(productId);
        return ResponseEntity.ok(averageRating);
    }
    
    @GetMapping("/rating-stats/{productId}")
    public ResponseEntity<ProductRatingStatsDTO> getRatingStats(@PathVariable Long productId) {
        return ResponseEntity.ok(productReviewService.getRatingStats(productId));
    }
}
