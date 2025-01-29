package com.store.service;

import com.store.dto.AdminDTO;
import com.store.dto.ApiResponse;
import com.store.dto.SignInRequest;

public interface AdminService {
    ApiResponse registerAdmin(AdminDTO registerAdminReq);
    ApiResponse loginAdmin(SignInRequest signInRequest);
}

