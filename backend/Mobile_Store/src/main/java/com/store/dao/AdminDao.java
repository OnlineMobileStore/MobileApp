package com.store.dao;

import com.store.pojo.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminDao extends JpaRepository<Admin, Long> {
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    Optional<Admin> findByEmail(String email);
}
