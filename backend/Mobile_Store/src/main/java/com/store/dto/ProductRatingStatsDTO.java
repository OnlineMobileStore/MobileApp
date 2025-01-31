package com.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRatingStatsDTO {
    private int oneStar;
    private int twoStars;
    private int threeStars;
    private int fourStars;
    private int fiveStars;
    private long totalReviews;
    private double averageRating;
}
