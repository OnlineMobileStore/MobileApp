package com.store.dto;

import java.util.List;

import com.store.pojo.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;
@Data
@EqualsAndHashCode(callSuper=false)
public class OrderResponseCustDTO extends BaseEntity{
	
	    private Long orderId;
	    private String paymentMethod;
	    private String status;
	    private Double totalAmount;
	    private List<OrderItemDTO> items;
	  
}

