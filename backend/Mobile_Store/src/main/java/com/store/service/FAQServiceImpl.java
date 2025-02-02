package com.store.service;

import com.store.dto.FAQDTO;
import com.store.exception.ResourceNotFoundException;
import com.store.pojo.FAQ;
import com.store.dao.FAQDao;
import com.store.service.FAQService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FAQServiceImpl implements FAQService {
    @Autowired
    private FAQDao faqDao;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public FAQDTO addFAQ(FAQDTO faqDTO) {
        FAQ faq = modelMapper.map(faqDTO, FAQ.class);
        FAQ savedFAQ = faqDao.save(faq);
        return modelMapper.map(savedFAQ, FAQDTO.class);
    }

    @Override
    public FAQDTO updateFAQ(Long id, FAQDTO faqDTO) {
        FAQ faq = faqDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ not found"));
        faq.setQuestion(faqDTO.getQuestion());
        faq.setAnswer(faqDTO.getAnswer());
        FAQ updatedFAQ = faqDao.save(faq);
        return modelMapper.map(updatedFAQ, FAQDTO.class);
    }

    @Override
    public List<FAQDTO> getAllFAQs() {
        List<FAQ> faqs = faqDao.findAll();
        return faqs.stream()
                .map(faq -> modelMapper.map(faq, FAQDTO.class))
                .collect(Collectors.toList());
    }
}
