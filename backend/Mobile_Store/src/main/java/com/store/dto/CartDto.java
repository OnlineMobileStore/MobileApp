package com.store.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString

public class CartDto {
	
	 @NotNull(message = "Customer ID is required")
	 private Long customerId;
	 
//	 private List<CartItemDto> items;
//	 
	 private Long productId;
	 
	 private int quantity;
	 
//	 private double price;
	 
	 

}
