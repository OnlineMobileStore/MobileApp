package com.store.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesDetailsDTO {

    private Long id; 
    private String productName; 
    private LocalDate date; 
    private Double totalPrice; 

}
