package com.store.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.pojo.Customer;
import com.store.pojo.Product;
import com.store.pojo.Wishlist;

public interface WishlistDao extends JpaRepository<Wishlist, Long> {
	 Optional<Product> findByCustomer(Customer customer);

}
