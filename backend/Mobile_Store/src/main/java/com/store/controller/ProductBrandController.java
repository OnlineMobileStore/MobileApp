package com.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.ApiResponse;
import com.store.dto.ProductBrandDTO;
import com.store.service.ProductBrandService;

@RestController
@RequestMapping("/brand")
@CrossOrigin(origins = "*")
public class ProductBrandController {

	@Autowired
	private ProductBrandService productBrandService;
	
	@PostMapping("/addBrand")
	public ResponseEntity<?>  addNewProductBrand(@RequestBody ProductBrandDTO dto){
		 ApiResponse response = productBrandService.addNewProductBrand(dto);
	        return ResponseEntity.ok(response);
	}
	
	@GetMapping("/allBrand")
	public ResponseEntity<?> getAllBrand(){
		List<ProductBrandDTO> productBrand=productBrandService.getAllBrand();
		if (productBrand.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(productBrand);
		
	}
	

//	@GetMapping("/{id}")
//	public ResponseEntity<?> getProductBrandDetails(@PathVariable Long id){
//		ProductBrandRespDTO productBrand=productBrandService.getProductBrandDetails(id);
//		return ResponseEntity.ok(productBrand); 
//	      
//	}
	

	
	

}
