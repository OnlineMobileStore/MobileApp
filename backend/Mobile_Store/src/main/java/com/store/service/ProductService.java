package com.store.service;

import java.util.List;

import com.store.dto.ApiResponse;
import com.store.dto.ProductDTO;

public interface ProductService {
	
	ApiResponse addNewProduct(ProductDTO dto);
	List<ProductDTO> getAllProduct();
	ProductDTO getProductDetails(Long Id);
	ApiResponse updateProductDetails(Long id, ProductDTO dto);
	ApiResponse deleteProduct(Long id);

}
