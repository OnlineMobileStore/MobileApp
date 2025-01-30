package com.store.service;

import java.util.List;

import com.store.dto.ApiResponse;
import com.store.dto.ProductBrandDTO;

public interface ProductBrandService {
	
	List<ProductBrandDTO> getAllBrand();
	ApiResponse addNewProductBrand(ProductBrandDTO dto);
	//ProductBrandRespDTO getProductBrandDetails(Long id);

}
