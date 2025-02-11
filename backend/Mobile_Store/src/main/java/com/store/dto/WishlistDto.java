package com.store.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.store.pojo.Customer;
import com.store.pojo.Product;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class WishlistDto extends BaseDTO{
	
	 @NotNull(message = "Customer ID is required")
	 private Long customerId;
	  
	 private Long productId;
	 
	 @JsonProperty(access=Access.READ_ONLY)
	 private String productName;
	 
	 @JsonProperty(access=Access.READ_ONLY)
	 private Double price;
	 
	 @JsonProperty(access=Access.READ_ONLY)
	 private Double discount;
	 
	 @JsonProperty(access=Access.READ_ONLY)
	 private String productImage;
	 
	 @JsonProperty(access=Access.READ_ONLY)
	 private Integer quantity;

}
