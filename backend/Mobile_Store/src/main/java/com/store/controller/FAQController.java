package com.store.controller;

import com.store.dto.FAQDTO;
import com.store.service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
public class FAQController {

    @Autowired
    private FAQService faqService;

    @PostMapping
    public ResponseEntity<FAQDTO> addFAQ(@RequestBody FAQDTO faqDTO) {
        FAQDTO createdFAQ = faqService.addFAQ(faqDTO);
        return ResponseEntity.ok(createdFAQ);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FAQDTO> updateFAQ(@PathVariable Long id, @RequestBody FAQDTO faqDTO) {
        FAQDTO updatedFAQ = faqService.updateFAQ(id, faqDTO);
        return ResponseEntity.ok(updatedFAQ);
    }

    @GetMapping
    public ResponseEntity<List<FAQDTO>> getAllFAQs() {
        List<FAQDTO> faqs = faqService.getAllFAQs();
        return ResponseEntity.ok(faqs);
    }
}
