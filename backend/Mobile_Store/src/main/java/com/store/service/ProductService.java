package com.store.service;

import java.util.List;

import com.store.dto.ApiResponse;
import com.store.dto.ProductDTO;
import com.store.pojo.ProductImage;

public interface ProductService {
	
	ApiResponse addNewProduct(ProductDTO dto);
	List<ProductDTO> getAllProduct();
	ProductDTO getProductDetails(Long Id);
	ApiResponse updateProductDetails(Long id, ProductDTO dto);
	ApiResponse deleteProduct(Long id);
	List<ProductDTO> getLatestProduct();
	public List<String> getImagePathsByProductId(Long productId);

}
