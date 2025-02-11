package com.store.service;

import java.util.List;

import com.store.dto.SalesDetailsDTO;
import com.store.dto.SalesSummaryDTO;

public interface SalesService {

	List<SalesDetailsDTO> getSalesDetails();

	 SalesSummaryDTO getSalesSummary();
}
