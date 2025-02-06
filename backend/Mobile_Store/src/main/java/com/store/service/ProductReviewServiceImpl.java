package com.store.service;
import com.store.dto.ProductRatingStatsDTO;
import com.store.dto.ProductReviewDTO;
import com.store.exception.ResourceNotFoundException;
import com.store.pojo.Product;
import com.store.pojo.Customer;
import com.store.pojo.ProductReview;
import com.store.dao.ProductReviewDao;
import com.store.dao.ProductDao;
import com.store.dao.CustomerDao;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductReviewServiceImpl implements ProductReviewService {
	
	@Autowired
    private final ProductReviewDao productReviewDao;
	
	@Autowired
    private final ProductDao productDao;
	
	@Autowired
    private final CustomerDao customerDao;

    @Override
    public ProductReviewDTO addReview(ProductReviewDTO dto) {
        Product product = productDao.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        Customer customer = customerDao.findById(dto.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        
        ProductReview review = new ProductReview();
        review.setProduct(product);
        review.setCustomer(customer);
        review.setTitle(dto.getTitle());
        review.setComment(dto.getComment());
        review.setRating(dto.getRating());

        review = productReviewDao.save(review);
        return new ProductReviewDTO(
                review.getProduct().getId(),review.getCustomer().getId(),
                review.getCustomer().getFirstName(), review.getTitle(),
                review.getComment(), review.getRating()
        );
    }

    @Override
    public List<ProductReviewDTO> getReviewsByProduct(Long productId) {
        return productReviewDao.findByProductId(productId).stream()
                .map(review -> new ProductReviewDTO(
                        review.getProduct().getId(),review.getCustomer().getId(), 
                        review.getCustomer().getFirstName(),review.getTitle(),
                        review.getComment(), review.getRating()))
                .collect(Collectors.toList());
    }
    
    public Double getAverageRating(Long productId) {
    	productDao.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return productReviewDao.findAverageRatingByProductId(productId);
    }
    

    public ProductRatingStatsDTO getRatingStats(Long productId) {
        // Ensure the product exists
        productDao.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        List<Object[]> resultList = productReviewDao.findRatingDistributionByProductId(productId);

        // Debugging output
        System.out.println("Query Result: " + resultList);

        // Ensure we have a result
        if (resultList == null || resultList.isEmpty()) {
            System.out.println("No results found, returning default values.");
            return new ProductRatingStatsDTO(0, 0, 0, 0, 0, 0, 0.0);
        }

        // Extract first row (should be a single row result)
        Object[] result = resultList.get(0);

        return new ProductRatingStatsDTO(
                ((Number) (result[0] != null ? result[0] : 0)).intValue(),
                ((Number) (result[1] != null ? result[1] : 0)).intValue(),
                ((Number) (result[2] != null ? result[2] : 0)).intValue(),
                ((Number) (result[3] != null ? result[3] : 0)).intValue(),
                ((Number) (result[4] != null ? result[4] : 0)).intValue(),
                ((Number) (result[5] != null ? result[5] : 0)).longValue(),
                ((Number) (result[6] != null ? result[6] : 0.0)).doubleValue()
        );
    }



}
