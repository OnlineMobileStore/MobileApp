package com.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.SalesDetailsDTO;
import com.store.service.SalesService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SalesController {

	@Autowired
    private  SalesService salesService;

    @GetMapping("/details")
    public ResponseEntity<List<SalesDetailsDTO>> getSalesDetails() {
        List<SalesDetailsDTO> salesDetails = salesService.getSalesDetails();
        return ResponseEntity.ok(salesDetails);
    }
}
