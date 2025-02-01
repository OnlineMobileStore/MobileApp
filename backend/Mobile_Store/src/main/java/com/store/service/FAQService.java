package com.store.service;

import com.store.dto.FAQDTO;
import java.util.List;

public interface FAQService {
    FAQDTO addFAQ(FAQDTO faqDTO);
    FAQDTO updateFAQ(Long id, FAQDTO faqDTO);
    List<FAQDTO> getAllFAQs();
}