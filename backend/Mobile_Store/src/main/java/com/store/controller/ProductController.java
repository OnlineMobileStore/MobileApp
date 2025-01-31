package com.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.ApiResponse;
import com.store.dto.ProductDTO;
import com.store.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping("/addProduct")
	public ResponseEntity<?> addNewProduct(@RequestBody ProductDTO dto){
		ApiResponse response = productService.addNewProduct(dto);
        return ResponseEntity.ok(response);	
        
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<?> getAllProduct(){
		List<ProductDTO> product=productService.getAllProduct();
		if(product.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    	return ResponseEntity.ok(product);
	}
	
	@GetMapping("/getId/{Id}")
	public ResponseEntity<?> getProductDetails(@PathVariable Long Id){
		ProductDTO product=productService.getProductDetails(Id);
		return ResponseEntity.ok(product);
		
	}
	
	@PutMapping("/update-product/{id}")
	public ResponseEntity<?> updateProductDetails(@PathVariable Long id,@RequestBody ProductDTO dto){
		return ResponseEntity.ok(productService.updateProductDetails(id,dto));
		
	}

    // Soft delete a product by setting isActive to false
    @PatchMapping("/delete-product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product with ID " + id + " has been deactivated.");
    }
	

}
