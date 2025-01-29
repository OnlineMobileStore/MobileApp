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
@Table(name = "product_brands")
public class ProductBrand extends BaseEntity{
    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    private String details;

    @Column(nullable = false)
    private Boolean isActive = true;
}