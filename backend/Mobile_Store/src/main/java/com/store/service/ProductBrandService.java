package com.store.service;

import java.util.List;

import com.store.dto.ApiResponse;
import com.store.dto.ProductBrandReqDTO;
import com.store.dto.ProductBrandRespDTO;

public interface ProductBrandService {
	
	List<ProductBrandRespDTO> getAllBrand();
	ApiResponse addNewProductBrand(ProductBrandReqDTO dto);
	//ProductBrandRespDTO getProductBrandDetails(Long id);

}
