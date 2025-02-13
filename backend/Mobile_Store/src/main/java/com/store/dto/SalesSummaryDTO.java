package com.store.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SalesSummaryDTO {
   
	private Double totalSales;
    private Double profit;
    private Long totalProducts;
    
    public SalesSummaryDTO(Double totalSales, Double profit, Long totalProducts) {
        this.totalSales = totalSales;
        this.profit = profit;
        this.totalProducts = totalProducts;
    }
}
