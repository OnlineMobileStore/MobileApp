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

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductDao productDao;
	
	@Autowired
    private ProductBrandDao productBrandDao;
	
	@Autowired
    private ModelMapper modelMapper;

	
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


	@Override
	public List<ProductRespDTO> getAllProduct() {
	    return productDao.findAll()
	            .stream()
	            .map(product -> {
	                ProductRespDTO dto = modelMapper.map(product, ProductRespDTO.class);
	                if (product.getBrand() != null) {
	                    dto.setBrand_id(product.getBrand().getId());
	                }
	                return dto;
	            })
	            .collect(Collectors.toList());
	}




}
