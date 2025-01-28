package com.store.service;

import com.store.pojo.Customer;
import com.store.dao.CustomerDao;
import com.store.dto.RegisterRequest;
import com.store.dto.ApiResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerDao customerDao;
    private final PasswordEncoder passwordEncoder;

    public CustomerServiceImpl(CustomerDao customerDao, PasswordEncoder passwordEncoder) {
        this.customerDao = customerDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ApiResponse registerCustomer(RegisterRequest registerRequest) {
        // Check if email or phone already exists
        if (customerDao.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Email already in use.");
        }
        if (customerDao.existsByPhone(registerRequest.getPhone())) {
            throw new IllegalArgumentException("Phone number already in use.");
        }

        // Create a new Customer object
        Customer customer = new Customer();
        customer.setFirstName(registerRequest.getFirstName());
        customer.setLastName(registerRequest.getLastName());
        customer.setEmail(registerRequest.getEmail());
        customer.setPhone(registerRequest.getPhone());
        customer.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Encrypt password
        customer.setCreatedOn(LocalDateTime.now());
        customer.setUpdatedOn(LocalDateTime.now());

        // Save the customer to the database
        customerDao.save(customer);

        // Return success response
        return new ApiResponse("Customer registered successfully.");
    }
}
