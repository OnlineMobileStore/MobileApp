package com.store.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductReviewRespDTO {
    private Long id;
    private Long productId;
    private Long customerId;
    private String title;
    private String comment;
    private Integer rating;
}