package com.store.controller;
import com.store.dto.ApiResponse;
import com.store.dto.OrderRequestDTO;
import com.store.dto.OrderStatusUpdateDTO;
import com.store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
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

     // Method to update the status of an order
    @PutMapping("/update-status/{orderId}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, 
                                                    @RequestBody OrderStatusUpdateDTO statusUpdateDTO) {
        // Set the orderId in the DTO received in the request body
        statusUpdateDTO.setOrderId(orderId);

        // Call the service to update the order status in the database
        boolean isUpdated = orderService.updateOrderStatus(statusUpdateDTO);

        // Return response based on the success of the update
        if (isUpdated) {
            return ResponseEntity.ok("Order status updated successfully.");
        } else {
            return ResponseEntity.status(400).body("Failed to update order status.");
        }
    }
}