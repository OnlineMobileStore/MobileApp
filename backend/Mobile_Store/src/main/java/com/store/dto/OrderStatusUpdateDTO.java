package com.store.dto;

import lombok.Data;

@Data
public class OrderStatusUpdateDTO {
    private Long orderId;
    private String status; // status can be "Delivered", "Shipped", "Cancelled"
}