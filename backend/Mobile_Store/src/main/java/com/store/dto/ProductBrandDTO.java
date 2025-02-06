package com.store.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductBrandDTO extends BaseDTO {
	
	@NotBlank(message = "Title is required")
	private String title;
	
	@NotBlank(message = "Details is required")
	private String details;

}
