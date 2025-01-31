package com.store.service;

import java.util.List;

import com.store.dto.AdminDTO;
import com.store.dto.ApiResponse;
import com.store.dto.CustomerDTO;
import com.store.dto.SignInRequest;

public interface AdminService {
    ApiResponse registerAdmin(AdminDTO registerAdminReq);
    ApiResponse loginAdmin(SignInRequest signInRequest);
	ApiResponse updateAdminDetails(Long adminId,AdminDTO dto);
	List<CustomerDTO> getAllCustomers();
	ApiResponse toggleCustomer(Long customerId);
	AdminDTO getDetailsById(Long adminId);
	
}

