package com.store.dto;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.Data;

@Data
public class ApiResponse {
    private String status;
    private String message;
    private String token;
    private Object data;
    private LocalDateTime timeStamp;

    public ApiResponse(String status, String message) {
        this.status = status; 
        this.message = message;
        this.timeStamp = LocalDateTime.now();
    }

    public ApiResponse(String status, Map<String, Object> responseData) {
        this.status = status;  
        this.message = (String) responseData.get("message");
        this.token = (String) responseData.get("token");
        this.data = responseData.get("user");  
        this.timeStamp = LocalDateTime.now();
    }
}
