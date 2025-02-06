package com.store.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductReviewDTO extends BaseDTO{

	@NotNull(message = "Product ID is required")
    private Long productId;
	@JsonProperty(access=Access.WRITE_ONLY)
    @NotNull(message = "Customer ID is required")
    private Long customerId;
    
    @JsonProperty(access=Access.READ_ONLY)
    private String customerName;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Comment is required")
    private String comment;
    
    @Min(1)
    @Max(5)
    private Integer rating;
}