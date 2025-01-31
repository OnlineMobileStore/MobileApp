package com.store.controller;
import com.store.dto.ApiResponse;
import com.store.dto.OrderRequestDTO;
import com.store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiResponse> getCustomerOrders(@PathVariable Long customerId) {
        ApiResponse response = orderService.getCustomerOrderDetails(customerId);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/all-customer-orders")
    public ApiResponse getAllCustomersWithOrders() {
        return orderService.getAllCustomersWithOrders();
    }
}