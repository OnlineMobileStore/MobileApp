package com.store.controller;

import com.store.dto.FAQDTO;
import com.store.service.FAQService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faqs")
public class FAQController {
    @Autowired
    private FAQService faqService;

    @PostMapping
    public ResponseEntity<FAQDTO> addFAQ(@Valid @RequestBody FAQDTO faqDTO) {
        return ResponseEntity.ok(faqService.addFAQ(faqDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FAQDTO> updateFAQ(@PathVariable Long id, @Valid @RequestBody FAQDTO faqDTO) {
        return ResponseEntity.ok(faqService.updateFAQ(id, faqDTO));
    }

    @GetMapping
    public ResponseEntity<List<FAQDTO>> getAllFAQs() {
        return ResponseEntity.ok(faqService.getAllFAQs());
    }
}
