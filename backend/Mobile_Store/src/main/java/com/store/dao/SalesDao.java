package com.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.store.pojo.Sales;

public interface SalesDao extends JpaRepository<Sales, Long> {

	  // Custom query to fetch sales details (for example)
    @Query("SELECT s.id, p.title, s.date, s.totalPrice " +
            "FROM Sales s " +
            "JOIN s.product p " +
            "WHERE s.isActive = true") // Adjust the query based on your schema
    List<Object[]> findSalesDetails();
    
    @Query("SELECT SUM(s.totalPrice) FROM Sales s WHERE s.isActive = true")
    Double getTotalSales();

    @Query("SELECT COUNT(DISTINCT s.product.id) FROM Sales s WHERE s.isActive = true")
    Long getTotalProducts();



}

