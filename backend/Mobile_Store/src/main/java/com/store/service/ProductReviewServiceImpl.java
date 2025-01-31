package com.store.service;
import com.store.dto.CustomerDTO;
import com.store.dto.ProductReviewDTO;
import com.store.exception.ResourceNotFoundException;
import com.store.pojo.Product;
import com.store.pojo.Customer;
import com.store.pojo.ProductReview;

import jakarta.transaction.Transactional;

import com.store.dao.ProductReviewDao;
import com.store.dao.ProductDao;
import com.store.dao.CustomerDao;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductReviewServiceImpl implements ProductReviewService {
	
	@Autowired
    private final ProductReviewDao productReviewDao;
	
	@Autowired
    private final ProductDao productDao;
	
	@Autowired
    private final CustomerDao customerDao;
	
	@Autowired
    private ModelMapper modelMapper;

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
        
        if (dto.getRating() < 1 || dto.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        review.setRating(dto.getRating());
        
        review.setCreatedOn(LocalDate.now());
        review.setUpdatedOn(LocalDateTime.now());

        review = productReviewDao.save(review);

        ProductReviewDTO reviewDTO = modelMapper.map(review, ProductReviewDTO.class);
        reviewDTO.setProductId(review.getProduct().getId());
        reviewDTO.setCustomerId(review.getCustomer().getId());

        return reviewDTO;
    }



    @Override
    public List<ProductReviewDTO> getReviewsByProduct(Long productId) {
        Product product = productDao.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return productReviewDao.findByProductId(productId).stream()
                .map(review -> {
                    ProductReviewDTO dto = modelMapper.map(review, ProductReviewDTO.class);
                    dto.setProductId(review.getProduct().getId());
                    dto.setCustomerId(review.getCustomer().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

}


//return new ProductReviewDTO(
//        review.getProduct().getId(),
//        review.getCustomer().getId(), review.getTitle(),
//        review.getComment(), review.getRating())