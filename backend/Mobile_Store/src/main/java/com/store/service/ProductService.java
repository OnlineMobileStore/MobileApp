package com.store.service;

import java.util.List;

import com.store.dto.ApiResponse;
import com.store.dto.ProductReqDTO;
import com.store.dto.ProductRespDTO;

public interface ProductService {
	
	ApiResponse addNewProduct(ProductReqDTO dto);
	List<ProductRespDTO> getAllProduct();

}
