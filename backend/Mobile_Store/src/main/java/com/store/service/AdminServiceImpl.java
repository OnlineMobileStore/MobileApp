package com.store.service;

import com.store.pojo.Admin;
import com.store.pojo.Customer;
import com.store.dao.AdminDao;
import com.store.dao.CustomerDao;
import com.store.dto.ApiResponse;
import com.store.dto.CustomerDTO;
import com.store.dto.AdminDTO;
import com.store.dto.SignInRequest;
import com.store.exception.AuthenticationException;
import com.store.exception.ResourceNotFoundException;
import com.store.util.JwtUtil;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
    private AdminDao adminDao;
    @Autowired
    private CustomerDao customerDao;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private ModelMapper modelMapper;

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
        return new ApiResponse("success","Admin registered successfully.");
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

        return new ApiResponse("success",responseData);
    }
    
    @Override
    public ApiResponse updateAdminDetails(Long adminId, AdminDTO adminDTO) {
        Admin admin = adminDao.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("admin not found with ID: " + adminId));
        modelMapper.map(adminDTO, admin);

        if (adminDTO.getPassword() != null) {
            admin.setPassword(passwordEncoder.encode(adminDTO.getPassword()));
        }

        admin.setUpdatedOn(LocalDateTime.now());

        adminDao.save(admin);

        return new ApiResponse("success","Admin details updated successfully.");
    }
    
    @Override
    public AdminDTO getDetailsById(Long adminId) {
        Admin admin = adminDao.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with ID: " + adminId));
        return modelMapper.map(admin, AdminDTO.class);
    }

    @Override
    public ApiResponse toggleCustomer(Long customerId) {
        Customer customer = customerDao.findById(customerId)
                .orElseThrow(() -> new AuthenticationException("Customer not found"));
        if(customer.getIsActive())
        {	
        	customer.setIsActive(false);
        }else {
        	customer.setIsActive(true);
        }
        customerDao.save(customer);

        return new ApiResponse("success","Customer soft deleted successfully.");
    }
    
    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerDao.findAll().stream().map(customer -> {
            CustomerDTO customerDTO = modelMapper.map(customer, CustomerDTO.class);

            if (customer.getAddress() != null) {
                customerDTO.setAddressLine(customer.getAddress().getAddressLine());
                customerDTO.setCity(customer.getAddress().getCity());
                customerDTO.setState(customer.getAddress().getState());
                customerDTO.setPostalCode(customer.getAddress().getPostalCode());
                customerDTO.setCountry(customer.getAddress().getCountry());
            }

            return customerDTO;
        }).collect(Collectors.toList());
    }

}
