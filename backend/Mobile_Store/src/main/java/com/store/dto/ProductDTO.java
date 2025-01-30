package com.store.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper=false)
@Data
public class ProductDTO extends BaseDTO{
	
    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Description is required")
    @Column(nullable = false, length = 2000)
    private String description;

    @Positive(message = "Price must be positive")
    @Column(nullable = false)
    private Double price;

    @NotBlank(message = "Discount is required")
    private Double discount;

    @NotBlank(message = "Color is required")
    private String color;

    @NotBlank(message = "Ram is required")
    private Integer ram;

    @NotBlank(message = "camera is required")
    private String camera;

    @NotBlank(message = "Color is required")
    private Integer storage;

    @NotBlank(message = "OS is required")
    private String os;

    @NotBlank(message = "Battery is required")
    private Integer battery;

    @NotBlank(message = "Screensize is required")
    private Double screenSize;

    @PositiveOrZero(message = "Quantity cannot be negative")
    private Integer quantity;

    @NotBlank(message = "Primary image is required")
    private String primaryImage;
    
    private Long brand_id ;

}