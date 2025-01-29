package com.store.service;

import com.store.pojo.Admin;
import com.store.dao.AdminDao;
import com.store.dto.ApiResponse;
import com.store.dto.AdminDTO;
import com.store.dto.SignInRequest;
import com.store.exception.AuthenticationException;
import com.store.util.JwtUtil;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminDao adminDao;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final ModelMapper modelMapper;

    public AdminServiceImpl(AdminDao adminDao, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, ModelMapper modelMapper) {
        this.adminDao = adminDao;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.modelMapper = modelMapper;
    }

    @Override
    public ApiResponse registerAdmin(AdminDTO registerRequest) {
        // Check if email or phone already exists
        if (adminDao.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalStateException("Email already in use.");
        }
        if (adminDao.existsByPhone(registerRequest.getPhone())) {
            throw new IllegalStateException("Phone number already in use.");
        }

        // Convert DTO to Entity
        Admin admin = modelMapper.map(registerRequest, Admin.class);
        admin.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Encrypt password
        admin.setCreatedOn(LocalDate.now());
        admin.setUpdatedOn(LocalDateTime.now());

        adminDao.save(admin);
        return new ApiResponse("Admin registered successfully.");
    }

    @Override
    public ApiResponse loginAdmin(SignInRequest signInRequest) {
        Admin admin = adminDao.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new AuthenticationException("Invalid email or password"));

        if (!passwordEncoder.matches(signInRequest.getPassword(), admin.getPassword())) {
            throw new AuthenticationException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(admin.getEmail());

        // Convert to response DTO (excluding password)
        AdminDTO adminResponse = modelMapper.map(admin, AdminDTO.class);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("message", "Sign-in successful");
        responseData.put("token", token);
        responseData.put("user", adminResponse);

        return new ApiResponse(responseData);
    }
    
}
