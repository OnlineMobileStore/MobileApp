package com.store.service;

import com.store.dao.FAQDao;
import com.store.dto.FAQReqDTO;
import com.store.dto.FAQRespDTO;
import com.store.exception.ResourceNotFoundException;
import com.store.pojo.FAQ;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FAQServiceImpl implements FAQService {
    private final FAQDao faqDao;

    @Override
    public List<FAQRespDTO> getAllFAQs() {
        return faqDao.findAll().stream()
                .map(faq -> new FAQRespDTO(faq.getId(), faq.getQuestion(), faq.getAnswer()))
                .collect(Collectors.toList());
    }

    @Override
    public FAQRespDTO getFAQById(Long id) {
        FAQ faq = faqDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ not found with ID: " + id));
        return new FAQRespDTO(faq.getId(), faq.getQuestion(), faq.getAnswer());
    }

    @Override
    public FAQRespDTO addFAQ(FAQReqDTO faqReqDTO) {
        FAQ faq = new FAQ();
        faq.setQuestion(faqReqDTO.getQuestion());
        faq.setAnswer(faqReqDTO.getAnswer());
        FAQ savedFAQ = faqDao.save(faq);
        return new FAQRespDTO(savedFAQ.getId(), savedFAQ.getQuestion(), savedFAQ.getAnswer());
    }
}
