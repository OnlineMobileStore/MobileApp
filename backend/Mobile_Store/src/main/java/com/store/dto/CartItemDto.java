package com.store.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CartItemDto {
	
	 @NotNull(message = "Product ID is required")
	 private Long productId;
	 
	 @Min(value = 1, message = "Quantity must be at least 1")
	 private int quantity;

}
