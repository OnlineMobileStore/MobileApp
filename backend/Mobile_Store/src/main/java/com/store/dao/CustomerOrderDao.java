package com.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.pojo.Customer;
import com.store.pojo.CustomerOrder;

public interface CustomerOrderDao extends JpaRepository<CustomerOrder, Long> {
 
	 List<CustomerOrder> findByCustomer(Customer customer);
}
