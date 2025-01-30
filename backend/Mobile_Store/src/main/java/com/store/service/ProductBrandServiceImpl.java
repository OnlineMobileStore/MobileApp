package com.store.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.dao.ProductBrandDao;
import com.store.dto.ApiResponse;
import com.store.dto.ProductBrandDTO;
import com.store.pojo.ProductBrand;

@Service
public class ProductBrandServiceImpl implements ProductBrandService {

    @Autowired
    private ProductBrandDao productBrandDao;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ApiResponse addNewProductBrand(ProductBrandDTO dto) {
        // Map DTO to entity
        ProductBrand prodBrandEntity = modelMapper.map(dto, ProductBrand.class);

        // Save the new product brand entity
       productBrandDao.save(prodBrandEntity);

        // Return API response with the new product brand ID
        return new ApiResponse("successs","Product brand added successfully ");
    }

	@Override
	public List<ProductBrandDTO> getAllBrand() {
		
		return productBrandDao.findAll()
				.stream()
				.map(brand->modelMapper.map(brand, ProductBrandDTO.class))
				.collect(Collectors.toList());
	}
    

//	@Override
//	public ProductBrandRespDTO getProductBrandDetails(Long id) {
//		ProductBrand productBrandEntity=productBrandDao.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Invalid Brand ID!!!"));
//		return  modelMapper.map(productBrandEntity,ProductBrandRespDTO.class);
//	}
	
}
