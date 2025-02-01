package com.store.dao;

import com.store.pojo.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FAQDao extends JpaRepository<FAQ, Long> {
}
