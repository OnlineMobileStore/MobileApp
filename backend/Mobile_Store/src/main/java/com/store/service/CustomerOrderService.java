package com.store.service;

import java.util.List;

import com.store.pojo.CustomerOrder;

public interface CustomerOrderService {
	
	List<CustomerOrder> getOrdersByCustomerId(Long customerId);
	
	 Double getTotalSales();

}
