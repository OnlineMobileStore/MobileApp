package com.store.service;

import com.store.dto.FAQReqDTO;
import com.store.dto.FAQRespDTO;
import java.util.List;

public interface FAQService {
    List<FAQRespDTO> getAllFAQs();
    FAQRespDTO getFAQById(Long id);
    FAQRespDTO addFAQ(FAQReqDTO faqReqDTO);
}

