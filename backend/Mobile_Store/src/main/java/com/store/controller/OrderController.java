package com.store.controller;
import com.store.dto.ApiResponse;
import com.store.dto.OrderRequestDTO;
import com.store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ApiResponse placeOrder(@RequestBody OrderRequestDTO orderRequest) {
        return orderService.placeOrder(orderRequest);
    }
    
    @GetMapping("/customer/{customerId}")
    public ApiResponse getCustomerOrderDetails(@PathVariable Long customerId) {
        return orderService.getCustomerOrderDetails(customerId);
    }
    
    @GetMapping("/all-customer-orders")
    public ApiResponse getAllCustomersWithOrders() {
        return orderService.getAllCustomersWithOrders();
    }
    
}