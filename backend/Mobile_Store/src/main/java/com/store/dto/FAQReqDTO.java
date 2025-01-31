package com.store.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FAQReqDTO {
    @NotBlank(message = "Question is required")
    private String question;
    private String answer;
}