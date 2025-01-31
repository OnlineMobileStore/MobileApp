package com.store.service;

import com.store.dto.ApiResponse;
import com.store.dto.OrderRequestDTO;

public interface OrderService {

	ApiResponse placeOrder(OrderRequestDTO orderRequest);
	ApiResponse getCustomerOrderDetails(Long customerId);
	ApiResponse getAllCustomersWithOrders();
}
