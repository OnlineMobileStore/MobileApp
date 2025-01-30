package com.store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.store.dao.CustomerOrderDao;
import com.store.pojo.CustomerOrder;

@Service
public class CustomerOrderServiceimpl implements CustomerOrderService {
	
	@Autowired
	public  CustomerOrderDao customerOrderDao;

	
    //Admin- cutomer orders
	@Override
	public List<CustomerOrder> getOrdersByCustomerId(Long customerId) {
		
		return customerOrderDao.findByCustomerId(customerId);
	}
	
	@Override
	 @Transactional(readOnly = true)
	    public Double getTotalSales() {
	        return customerOrderDao.getTotalSales();
	    }

}
