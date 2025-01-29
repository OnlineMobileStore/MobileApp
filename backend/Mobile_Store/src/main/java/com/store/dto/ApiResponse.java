package com.store.dto;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.Data;

@Data
public class ApiResponse {
    private String message;
    private String token;
    private Object data;
    private LocalDateTime timeStamp;

    public ApiResponse(String message) {
        this.message = message;
        this.timeStamp=LocalDateTime.now();
    }

    public ApiResponse(Map<String, Object> responseData) {
        this.message = (String) responseData.get("message");
        this.token = (String) responseData.get("token");
        this.data = responseData.get("user");  
        this.timeStamp=LocalDateTime.now();
    }
}
