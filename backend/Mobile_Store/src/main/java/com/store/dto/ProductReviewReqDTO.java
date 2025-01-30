package com.store.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductReviewReqDTO {
    @NotNull(message = "Product ID is required")
    private Long productId;
    
    @NotNull(message = "Customer ID is required")
    private Long customerId;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Comment is required")
    private String comment;
    
    @Min(1)
    @Max(5)
    private Integer rating;
}