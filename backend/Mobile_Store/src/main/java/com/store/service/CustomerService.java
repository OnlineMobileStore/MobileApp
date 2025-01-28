package com.store.service;

import com.store.dto.RegisterRequest;
import com.store.dto.ApiResponse;

public interface CustomerService {
    ApiResponse registerCustomer(RegisterRequest registerRequest);
}
