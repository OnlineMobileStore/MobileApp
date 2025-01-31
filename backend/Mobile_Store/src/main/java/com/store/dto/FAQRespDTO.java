package com.store.dto;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FAQRespDTO {
    private Long id;
    private String question;
    private String answer;
}