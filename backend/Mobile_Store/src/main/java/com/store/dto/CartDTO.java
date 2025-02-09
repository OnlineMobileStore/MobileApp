package com.store.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString

public class CartDTO extends BaseDTO{
	
	 @NotNull(message = "Customer ID is required")
	 private Long customerId;
	  
	 private Long productId;
	 
	 @JsonProperty(access=Access.READ_ONLY)
	 private String productName;
	 
	 @JsonProperty(access=Access.READ_ONLY)
	 private Double oprice;
	 
	 @JsonProperty(access=Access.READ_ONLY)
	 private Double discount;
	 
	 @JsonProperty(access=Access.READ_ONLY)
	 private String productImage;
	 
	 @JsonProperty(access=Access.READ_ONLY)
	 private Integer productQuantity;
	 
	 private Integer quantity;
	 
	 private Double price;
	 
}
