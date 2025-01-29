package com.store.pojo;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "revenue_trend")
public class RevenueTrend extends BaseEntity{

    @NotBlank(message = "Month is required")
    @Column(nullable = false)
    private String month;

    @PositiveOrZero(message = "Revenue must be zero or positive")
    @Column(nullable = false)
    private Double revenue;

    @PositiveOrZero(message = "Growth percentage must be zero or positive")
    @Column(nullable = false)
    private Double growthPercentage; 


}
