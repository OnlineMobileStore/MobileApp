package com.store.pojo;
import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product_reviews")
public class ProductReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @NotBlank(message = "Comment is required")
    @Column(nullable = false, length = 2000)
    private String comment;

    @Min(1)
    @Max(5)
    @Column(nullable = false)
    private Integer rating;
    
    @NotBlank(message = "title is required")
    @Column(nullable = false, length = 100)
    private String title;
}
