package com.store.dao;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.store.pojo.Wishlist;


public interface WishlistDao extends JpaRepository<Wishlist, Long> {
	 List<Wishlist> findByCustomerId(Long customerId);
	    
	 Optional<Wishlist> findByCustomerIdAndProductId(Long customerId, Long productId);
	 
}
