package com.store.service;

import com.store.dto.ApiResponse;
import com.store.dto.CustomerDTO;
import com.store.dto.SignInRequest;

public interface CustomerService {
    ApiResponse registerCustomer(CustomerDTO registerRequest);
    ApiResponse loginCustomer(SignInRequest signInRequest);
	ApiResponse updateCustomerDetails(Long customerId, CustomerDTO dto);
    CustomerDTO getCustomerDetailsById(Long customerId);  
}
