package com.store.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.dao.SalesDao;
import com.store.dto.SalesDetailsDTO;
import com.store.dto.SalesSummaryDTO;

@Service
@Transactional
public class SalesServiceImpl implements SalesService {
	
	@Autowired
	 private  SalesDao salesDao;

	    // Method to get sales details
	    public List<SalesDetailsDTO> getSalesDetails() {
	        // Fetch sales data from the database
	        List<Object[]> salesData = salesDao.findSalesDetails(); 

	        // Convert the raw data into SalesDetailsDTO
	        return salesData.stream()
	                .map(data -> new SalesDetailsDTO(
	                        (Long) data[0], // Assuming data[0] is the sale ID
	                        (String) data[1], // Assuming data[1] is the product name
	                        (java.time.LocalDate) data[2], // Assuming data[2] is the sale date
	                        (Double) data[3] // Assuming data[3] is the total price
	                ))
	                .collect(Collectors.toList());
	    }
	    
	    public SalesSummaryDTO getSalesSummary() {
	        Double totalSales = salesDao.getTotalSales();
	        Long totalProducts = salesDao.getTotalProducts();
	        Double profit = totalSales * 0.40; // Profit is 40% of total sales

	        return new SalesSummaryDTO(totalSales, profit, totalProducts);
	    }


}
