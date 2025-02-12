package com.store.pojo;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "sales_summary")
public class SalesSummary extends BaseEntity{

    @NotBlank(message = "Month is required")
    @Column(nullable = false)
    private String month; // Example: "2025-01"

    @PositiveOrZero(message = "Total sales must be zero or positive")
    @Column(nullable = false)
    private Double totalSales; // Sum of all orders

    @PositiveOrZero(message = "Total income must be zero or positive")
    @Column(nullable = false)
    private Double totalIncome; // After discounts, etc.

    @PositiveOrZero(message = "Total profit must be zero or positive")
    @Column(nullable = false)
    private Double totalProfit;

    @PositiveOrZero(message = "Total orders must be zero or positive")
    @Column(nullable = false)
    private Integer totalOrders;

}
