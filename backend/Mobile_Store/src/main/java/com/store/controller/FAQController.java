package com.store.controller;

import com.store.dto.FAQReqDTO;
import com.store.dto.FAQRespDTO;
import com.store.service.FAQService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faqs")
@RequiredArgsConstructor
public class FAQController
{
	
    private final FAQService faqService;

    @GetMapping
    public ResponseEntity<List<FAQRespDTO>> getAllFAQs() {
        return ResponseEntity.ok(faqService.getAllFAQs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FAQRespDTO> getFAQById(@PathVariable Long id) {
        return ResponseEntity.ok(faqService.getFAQById(id));
    }
    
    @PostMapping
    public ResponseEntity<FAQRespDTO> addFAQ(@Valid @RequestBody FAQReqDTO faqReqDTO) {
        return ResponseEntity.ok(faqService.addFAQ(faqReqDTO));
    }
    
}
