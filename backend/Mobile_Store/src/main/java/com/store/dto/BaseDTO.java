package com.store.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;


@Data
public class BaseDTO {
	@JsonProperty(access=Access.READ_ONLY)
	private Long id;
	@JsonProperty(access=Access.READ_ONLY)
	private LocalDate createdOn;
	@JsonProperty(access=Access.READ_ONLY)
	private LocalDateTime updatedOn;
	@JsonProperty(access=Access.READ_ONLY)
    private Boolean isActive = true;
}

