package com.store.controller;

import com.store.dto.ApiResponse;
import com.store.dto.RegisterRequest;
import com.store.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class AuthController {

    private final CustomerService customerService;

    public AuthController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerCustomer(@RequestBody RegisterRequest registerRequest) {
        ApiResponse response = customerService.registerCustomer(registerRequest);
        return ResponseEntity.ok(response);
    }
}
