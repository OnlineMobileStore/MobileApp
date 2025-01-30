package com.store.service;
import com.store.dto.ProductReviewReqDTO;
import com.store.dto.ProductReviewRespDTO;
import com.store.exception.ResourceNotFoundException;
import com.store.pojo.Product;
import com.store.pojo.Customer;
import com.store.pojo.ProductReview;
import com.store.dao.ProductReviewDao;
import com.store.dao.ProductDao;
import com.store.dao.CustomerDao;
import com.store.service.ProductReviewService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
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
    public ProductReviewRespDTO addReview(ProductReviewReqDTO dto) {
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
        return new ProductReviewRespDTO(
                review.getId(), review.getProduct().getId(),
                review.getCustomer().getId(), review.getTitle(),
                review.getComment(), review.getRating()
        );
    }

    @Override
    public List<ProductReviewRespDTO> getReviewsByProduct(Long productId) {
        return productReviewDao.findByProductId(productId).stream()
                .map(review -> new ProductReviewRespDTO(
                        review.getId(), review.getProduct().getId(),
                        review.getCustomer().getId(), review.getTitle(),
                        review.getComment(), review.getRating()))
                .collect(Collectors.toList());
    }
}
