package com.store.dto;

import lombok.Data;

@Data

public class ProductRespDTO extends BaseDTO{

    private String title;

    private String description;

    private Double price;

    private Double discount;

    private String color;

    private Integer ram;

    private String camera;

    private Integer storage;

    private String os;

    private Integer battery;
    
    private Double screenSize;
    
    private Integer quantity;
    
    private String primaryImage;
    
    private Long brand_id ;



}

