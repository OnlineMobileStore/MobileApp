package com.store.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {
	
	    private Long customerId;
	    private String paymentMethod;
	    private List<OrderItemDTO> orderItems;

}
