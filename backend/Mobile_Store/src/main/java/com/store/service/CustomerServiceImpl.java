package com.store.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.dao.CustomerDao;
import com.store.dto.ApiResponse;
import com.store.dto.CustomerDTO;
import com.store.dto.SignInRequest;
import com.store.exception.AuthenticationException;
import com.store.exception.ResourceNotFoundException;
import com.store.pojo.Customer;
import com.store.pojo.CustomerAddress;
import com.store.util.JwtUtil;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerDao customerDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ApiResponse registerCustomer(CustomerDTO dto) {
        if (customerDao.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already in use.");
        }
        if (customerDao.existsByPhone(dto.getPhone())) {
            throw new IllegalArgumentException("Phone number already in use.");
        }

        // Convert DTO to Entity
        Customer customer = modelMapper.map(dto, Customer.class);
        customer.setPassword(passwordEncoder.encode(dto.getPassword()));
        customer.setCreatedOn(LocalDate.now());
        customer.setUpdatedOn(LocalDateTime.now());

        // Map Address
        CustomerAddress address = modelMapper.map(dto, CustomerAddress.class);
        address.setCustomer(customer);
        customer.setAddress(address);

        // Save customer
        customerDao.save(customer);

        return new ApiResponse("success","Customer registered successfully.");
    }

    @Override
    public ApiResponse loginCustomer(SignInRequest signInRequest) {
        Customer customer = customerDao.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new AuthenticationException("Invalid email or password"));

        if (!passwordEncoder.matches(signInRequest.getPassword(), customer.getPassword())) {
            throw new AuthenticationException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(customer.getEmail());

        // Convert Entity to Response DTO
         CustomerDTO customerResp = modelMapper.map(customer, CustomerDTO.class);
         if (customer.getAddress() != null) {
             customerResp.setAddressLine(customer.getAddress().getAddressLine());
             customerResp.setCity(customer.getAddress().getCity());
             customerResp.setState(customer.getAddress().getState());
             customerResp.setPostalCode(customer.getAddress().getPostalCode());
             customerResp.setCountry(customer.getAddress().getCountry());
         }
        
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("message", "Sign-in successful");
        responseData.put("token", token);
        responseData.put("user", customerResp);

        return new ApiResponse("success",responseData);
    }

	
    @Override
    public ApiResponse updateCustomerDetails(Long customerId, CustomerDTO customerDTO) {
        Customer customer = customerDao.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + customerId));
        modelMapper.map(customerDTO, customer);

        if (customerDTO.getPassword() != null) {
            customer.setPassword(passwordEncoder.encode(customerDTO.getPassword()));
        }

        customer.setUpdatedOn(LocalDateTime.now());

        customerDao.save(customer);

        return new ApiResponse("success","Customer details updated successfully.");
    }
    
    public CustomerDTO getCustomerDetailsById(Long customerId) {
        Customer customer = customerDao.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + customerId));

        CustomerDTO customerDTO = modelMapper.map(customer, CustomerDTO.class);

        if (customer.getAddress() != null) {
            customerDTO.setAddressLine(customer.getAddress().getAddressLine());
            customerDTO.setCity(customer.getAddress().getCity());
            customerDTO.setState(customer.getAddress().getState());
            customerDTO.setPostalCode(customer.getAddress().getPostalCode());
            customerDTO.setCountry(customer.getAddress().getCountry());
        }

        return customerDTO;
    }
    
  
}
