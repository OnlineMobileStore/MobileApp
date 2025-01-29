package com.store.controller;

import com.store.dto.AdminDTO;
import com.store.dto.ApiResponse;
import com.store.dto.CustomerDTO;
import com.store.dto.SignInRequest;
import com.store.service.AdminService;
import com.store.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final CustomerService customerService;
    private final AdminService adminService;

    // Constructor-based dependency injection
    public AuthController(CustomerService customerService, AdminService adminService) {
        this.customerService = customerService;
        this.adminService = adminService;
    }

    // Customer Registration
    @PostMapping("/register-customer")
    public ResponseEntity<ApiResponse> signUpCustomer(@RequestBody CustomerDTO registerRequest) {
        ApiResponse response = customerService.registerCustomer(registerRequest);
        return ResponseEntity.ok(response);
    }

    // Customer Login
    @PostMapping("/login-customer")
    public ResponseEntity<ApiResponse> signInCustomer(@RequestBody SignInRequest signInRequest) {
        ApiResponse response = customerService.loginCustomer(signInRequest);
        return ResponseEntity.ok(response);
    }

    // Admin Registration
    @PostMapping("/register-admin")
    public ResponseEntity<ApiResponse> signUpAdmin(@RequestBody AdminDTO registerAdminReq) {
        ApiResponse response = adminService.registerAdmin(registerAdminReq);
        return ResponseEntity.ok(response);
    }

    // Admin Login (Fixed method call)
    @PostMapping("/login-admin")
    public ResponseEntity<ApiResponse> signInAdmin(@RequestBody SignInRequest signInRequest) {
        ApiResponse response = adminService.loginAdmin(signInRequest);
        return ResponseEntity.ok(response);
    }
}
