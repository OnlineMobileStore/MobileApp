package com.store.controller;


import com.store.service.OTPService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/otp")
@CrossOrigin(origins = "*")
public class OTPController {

    private final OTPService otpService;

    public OTPController(OTPService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        otpService.sendOtpEmail(email);

        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP sent successfully.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        Map<String, String> response = new HashMap<>();
        if (otpService.verifyOtp(email, otp)) {
            response.put("message", "OTP verified successfully.");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid OTP.");
            return ResponseEntity.badRequest().body(response);
        }
    }
}
