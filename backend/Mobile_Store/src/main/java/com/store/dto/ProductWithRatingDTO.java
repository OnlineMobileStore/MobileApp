package com.store.dto;

import com.store.pojo.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductWithRatingDTO {
	
	
	private Long id;
    private String productName;
    private double averageRating;

    public ProductWithRatingDTO(Product product, double averageRating) {
        this.id = product.getId();
        this.productName = product.getTitle();
        this.averageRating = averageRating;
    }
    
}
