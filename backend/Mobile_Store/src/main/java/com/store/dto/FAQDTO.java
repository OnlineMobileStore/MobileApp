package com.store.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FAQDTO extends BaseDTO {
    @NotBlank(message = "Question is required")
    private String question;
    private String answer;
}