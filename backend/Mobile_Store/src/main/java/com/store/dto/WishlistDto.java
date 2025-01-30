package com.store.dto;

import java.util.List;

import com.store.pojo.Customer;
import com.store.pojo.Product;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class WishlistDto {
	
	 private Long customerId;

	 
	 private Long productId;

}
