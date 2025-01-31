package com.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CustomerOrdersResponseDTO {
    private Long customerId;
    private String customerName;
    private List<OrderResponseCustDTO> orders;
}
