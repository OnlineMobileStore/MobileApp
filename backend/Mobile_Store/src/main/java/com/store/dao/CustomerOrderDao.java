package com.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.store.pojo.CustomerOrder;

public interface CustomerOrderDao extends JpaRepository<CustomerOrder, Long> {
 
	List<CustomerOrder> findByCustomerId(Long customerId);
	
	 @Query("SELECT SUM(co.totalAmount) FROM CustomerOrder co")
	 Double getTotalSales();
}
