package com.store.service;


import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.dao.ProductBrandDao;
import com.store.dao.ProductDao;
import com.store.dto.ApiResponse;
import com.store.dto.ProductReqDTO;
import com.store.dto.ProductRespDTO;
import com.store.exception.ResourceNotFoundException;
import com.store.pojo.Product;
import com.store.pojo.ProductBrand;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductDao productDao;
	
	@Autowired
    private ProductBrandDao productBrandDao;
	
	@Autowired
    private ModelMapper modelMapper;

    // add the product
	@Override
	public ApiResponse addNewProduct(ProductReqDTO dto) {
		// 1. get Brand by it's id
		ProductBrand productBrand=productBrandDao.findById(dto.getBrand_id())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid product id!!!!"));
		//2. map dto -> entity
		Product productEntity= modelMapper.map(dto,Product.class);
		
		productEntity.setBrand(productBrand);
		productEntity.setIsActive(true);
		productDao.save(productEntity);
		return new ApiResponse("Product added successfully ");
		
	}

	//to get all product
	@Override
	public List<ProductRespDTO> getAllProduct() {
	    return productDao.findByIsActiveTrue() // Fetch only active products
	            .stream()
	            .map(product -> {
	                ProductRespDTO dto = modelMapper.map(product, ProductRespDTO.class);
	                // To avoid null value in brand_id
	                if (product.getBrand() != null) {
	                    dto.setBrand_id(product.getBrand().getId());
	                }
	                return dto;
	            })
	            .collect(Collectors.toList());
	}


	//to get product by id
	@Override
	public ProductRespDTO getProductDetails(Long Id) {
	    Product productEntity = productDao.findById(Id)
	            .orElseThrow(() -> 
	                    new ResourceNotFoundException("Invalid Product ID!!!"));

	    ProductRespDTO productRespDTO = modelMapper.map(productEntity, ProductRespDTO.class);

	    // Ensuring brand_id is set if available
	    if (productEntity.getBrand() != null) {
	        productRespDTO.setBrand_id(productEntity.getBrand().getId());
	    }

	    return productRespDTO;
	}
	
	
	//update product Details
	@Override
	public ApiResponse updateProductDetails(Long id, ProductReqDTO dto) {
	    return productDao.findById(id).map(product -> {
	        modelMapper.map(dto, product);
	        if (dto.getBrand_id() != null) {
	        	productBrandDao.findById(dto.getBrand_id()).ifPresent(product::setBrand);
	        }
	        productDao.save(product);
	        return new ApiResponse("Product Updated");
	    }).orElse(new ApiResponse("Invalid Product ID !!!!"));
	}
	
	// soft delete product

	    @Transactional
	    @Override
	    public ApiResponse deleteProduct(Long id) {
	        Product product = productDao.findByIdAndIsActiveTrue(id)
	                .orElseThrow(() -> new EntityNotFoundException("Product with ID " + id + " not found or already deactivated."));
	        product.setIsActive(false);
	        productDao.save(product);
			return new ApiResponse("Product deleted");
	    }




	
}
