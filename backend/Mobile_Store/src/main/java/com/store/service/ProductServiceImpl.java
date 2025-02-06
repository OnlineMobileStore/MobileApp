package com.store.service;


import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.dao.ProductBrandDao;
import com.store.dao.ProductDao;
import com.store.dao.ProductImageDao;
import com.store.dto.ApiResponse;
import com.store.dto.ProductDTO;
import com.store.exception.ResourceNotFoundException;
import com.store.pojo.Product;
import com.store.pojo.ProductImage;

import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductDao productDao;
	
	@Autowired
    private ProductBrandDao productBrandDao;
	
	@Autowired
    private ProductImageDao productImageDao;
	
	@Autowired
    private ModelMapper modelMapper;

    // add the product
	@Override
	public ApiResponse addNewProduct(ProductDTO dto) {
	    Product productEntity = new Product();
	    productEntity.setTitle(dto.getTitle());
	    productEntity.setDescription(dto.getDescription());
	    productEntity.setBrand(productBrandDao.findByTitle(dto.getBrand_name())
	        .orElseThrow(() -> new ResourceNotFoundException("Invalid brand name!!!!")));
	    productEntity.setPrice(dto.getPrice());
	    productEntity.setDiscount(dto.getDiscount());
	    productEntity.setColor(dto.getColor()); 
	    productEntity.setRam(dto.getRam());
	    productEntity.setCamera(dto.getCamera());
	    productEntity.setStorage(dto.getStorage());
	    productEntity.setOs(dto.getOs());
	    productEntity.setBattery(dto.getBattery());
	    productEntity.setScreenSize(dto.getScreenSize());
	    productEntity.setQuantity(dto.getQuantity());
	    productEntity.setIsActive(true); 

	    if (dto.getImages() == null || dto.getImages().isEmpty()) {
	        return new ApiResponse("error", "At least one image is required");
	    }

	    productEntity.setPrimaryImage(dto.getImages().get(0));

	    // Save product first
	    Product savedProduct = productDao.save(productEntity);

	    // Save associated images
	    List<ProductImage> images = dto.getImages().stream()
	        .map(imagePath -> new ProductImage(imagePath, savedProduct))
	        .collect(Collectors.toList());

	    if (!images.isEmpty()) {
	        productImageDao.saveAll(images);
	    }

	    return new ApiResponse("success", "Product added successfully");
	}

	//update product Details
	@Override
	public ApiResponse updateProductDetails(Long id, ProductDTO dto) {
	    // Find the existing product by ID
	    Product product = productDao.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Invalid Product ID !!!!"));

	    // Map the DTO to the existing product (excluding images)
	    modelMapper.map(dto, product);

	    // Update the brand if a valid brand name is provided
	    if (dto.getBrand_name() != null) {
	        productBrandDao.findByTitle(dto.getBrand_name()).ifPresentOrElse(
	            product::setBrand,
	            () -> product.setBrand(null) // Handle the case where the brand is not found
	        );
	    }

	    // Update the primary image if it's provided in the DTO
	    if (dto.getPrimaryImage() != null && !dto.getPrimaryImage().isEmpty()) {
	        product.setPrimaryImage(dto.getPrimaryImage());
	    }

	    // Save the product without changing images
	    productDao.save(product);

	    return new ApiResponse("success", "Product Updated");
	}



	//to get all product
	@Override
	public List<ProductDTO> getAllProduct() {
	    return productDao.findByIsActiveTrue()
	            .stream()
	            .map(product -> {
	                ProductDTO dto = modelMapper.map(product, ProductDTO.class);

	                // Ensure brand_name is mapped properly
	                if (product.getBrand() != null) {
	                    dto.setBrand_name(product.getBrand().getTitle());
	                }

	                // Convert Lazy-loaded PersistentBag to a List<String>
	                if (product.getImages() != null && !product.getImages().isEmpty()) {
	                    dto.setImages(product.getImages().stream()
	                            .map(ProductImage::getImagePath) // Convert ProductImage -> imagePath String
	                            .collect(Collectors.toList()));
	                } else {
	                    dto.setImages(Collections.emptyList()); // Avoid null issues
	                }

	                return dto;
	            })
	            .collect(Collectors.toList());
	}

	//to get product by id
	@Override
	public ProductDTO getProductDetails(Long Id) {
	    Product productEntity = productDao.findById(Id)
	            .orElseThrow(() -> 
	                    new ResourceNotFoundException("Invalid Product ID!!!"));

	    ProductDTO productRespDTO = modelMapper.map(productEntity, ProductDTO.class);

	    // Ensuring brand_id is set if available
	    if (productEntity.getBrand() != null) {
	        productRespDTO.setBrand_name(productEntity.getBrand().getTitle());
	    }

	    return productRespDTO;
	}
	
	    @Override
	    public ApiResponse deleteProduct(Long id) {
	        Product product = productDao.findByIdAndIsActiveTrue(id)
	                .orElseThrow(() -> new EntityNotFoundException("Product with ID " + id + " not found or already deactivated."));
	        product.setIsActive(false);
	        productDao.save(product);
			return new ApiResponse("successs","Product deleted");
	    }

	    @Override
	    public List<ProductDTO> getLatestProduct() {
	        return productDao.findTop3ByOrderByCreatedOnDesc()
	                .stream()
	                .map(product ->{
	                	
	                	ProductDTO dto=modelMapper.map(product, ProductDTO.class);
	                	if (product.getBrand() != null) {
		                    dto.setBrand_name(product.getBrand().getTitle());
		                }
	                	return dto;
	                }).collect(Collectors.toList());
	    }

		@Override
		public List<String> getImagePathsByProductId(Long productId) {
	        // Fetch all ProductImage records for the given product ID
	        List<ProductImage> productImages = productImageDao.findByProductId(productId);

	        // Return the list of image paths
	        return productImages.stream()
	                            .map(ProductImage::getImagePath)
	                            .collect(Collectors.toList());
	    }

	
}
