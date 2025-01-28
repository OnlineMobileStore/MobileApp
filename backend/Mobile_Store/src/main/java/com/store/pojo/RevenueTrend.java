package com.store.pojo;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "revenue_trend")
public class RevenueTrend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Month is required")
    @Column(nullable = false)
    private String month;

    @PositiveOrZero(message = "Revenue must be zero or positive")
    @Column(nullable = false)
    private Double revenue;

    @PositiveOrZero(message = "Growth percentage must be zero or positive")
    @Column(nullable = false)
    private Double growthPercentage; // Compared to the previous month

    @Column(nullable = false)
    private LocalDateTime createdOn = LocalDateTime.now();
}
