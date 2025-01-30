package com.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.pojo.CustomerOrder;
import com.store.service.CustomerOrderService;

@RestController
@RequestMapping("/admin/orders")
public class CustomerOrderController {
	
	@Autowired
	private  CustomerOrderService customerOrderService;
	
	@GetMapping("/{customerId}")
    public ResponseEntity<List<CustomerOrder>> getOrdersByCustomer(@PathVariable Long customerId) {
        List<CustomerOrder> orders = customerOrderService.getOrdersByCustomerId(customerId);
        return ResponseEntity.ok(orders);
    }
	
	@GetMapping("/total-sales")
    public Double getTotalSales() {
        return customerOrderService.getTotalSales();
    }

}
