package com.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.pojo.CartItem;

public interface CartItemDao extends JpaRepository<CartItem, Long> {

	CartItem findByIdAndCartId(Long itemId, Long cartId);
}
