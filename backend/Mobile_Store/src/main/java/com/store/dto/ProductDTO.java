package com.store.dto;

import java.util.List;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper=false)
@Data
public class ProductDTO extends BaseDTO {
	
    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Description is required")
    @Column(nullable = false, length = 2000)
    private String description;

    @Positive(message = "Price must be positive") 
    @Column(nullable = false)
    private Double price;

    private Double discount; 

    private String color; 

    private Integer ram;

    private Integer camera; 

    private Integer storage; 

    private String os; 

    private Integer battery; 

    private Double screenSize; 

    @PositiveOrZero(message = "Quantity cannot be negative") 
    private Integer quantity;

    @NotBlank(message = "Primary image is required")
    private String primaryImage;

    private String brand_name;

    private List<String> images; 
}
