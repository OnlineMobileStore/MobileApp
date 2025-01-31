package com.store.controller;

import com.store.dto.AdminDTO;
import com.store.dto.ApiResponse;
import com.store.dto.CustomerDTO;
import com.store.dto.SignInRequest;
import com.store.service.AdminService;
import com.store.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
   
    @Autowired
	private CustomerService customerService;
    
    @Autowired
	private AdminService adminService;

    @PostMapping("/register-customer")
    public ResponseEntity<ApiResponse> signUpCustomer(@RequestBody CustomerDTO registerRequest) {
        ApiResponse response = customerService.registerCustomer(registerRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login-customer")
    public ResponseEntity<ApiResponse> signInCustomer(@RequestBody SignInRequest signInRequest) {
        ApiResponse response = customerService.loginCustomer(signInRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register-admin")
    public ResponseEntity<ApiResponse> signUpAdmin(@RequestBody AdminDTO registerAdminReq) {
        ApiResponse response = adminService.registerAdmin(registerAdminReq);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login-admin")
    public ResponseEntity<ApiResponse> signInAdmin(@RequestBody SignInRequest signInRequest) {
        ApiResponse response = adminService.loginAdmin(signInRequest);
        return ResponseEntity.ok(response);
    }
}
