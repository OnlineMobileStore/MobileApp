package com.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.AdminDTO;
import com.store.dto.ApiResponse;
import com.store.dto.CustomerDTO;
import com.store.service.AdminService;



@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@GetMapping("/getById/{adminId}")
    public ResponseEntity<AdminDTO> getCustomer(@PathVariable Long adminId) {
        return ResponseEntity.ok(adminService.getDetailsById(adminId));
    }
	
	@PutMapping("/updateAdmin/{adminId}")
    public ResponseEntity<ApiResponse> updateAdminDetails(@PathVariable Long adminId, @RequestBody AdminDTO dto) {
        return ResponseEntity.ok(adminService.updateAdminDetails(adminId,dto));
    }
	
	@PutMapping("/toggleCustomer/{customerId}")
    public ResponseEntity<ApiResponse> softSetCustomer( @PathVariable Long customerId) {
        return ResponseEntity.ok(adminService.toggleCustomer(customerId));
    }
	
	@GetMapping("/getAllcustomers")
    public ResponseEntity<List<CustomerDTO>> getCustomers() {
        return ResponseEntity.ok(adminService.getAllCustomers());
    }
	
}
