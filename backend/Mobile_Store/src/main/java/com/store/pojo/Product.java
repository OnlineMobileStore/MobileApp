package com.store.pojo;
import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = { "images","brand" })
@Entity
@Table(name = "products")
public class Product extends BaseEntity{

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Description is required")
    @Column(nullable = false, length = 2000)
    private String description;

    @Positive(message = "Price must be positive")
    @Column(nullable = false)
    private Double price;

    private Double discount;

    @NotBlank(message = "Color is required")
    private String color;

    private Integer ram;

    private String camera;

    private Integer storage;

    private String os;

    private Integer battery;

    private Double screenSize;

    private Integer quantity;

    @NotBlank(message = "Primary image is required")
    private String primaryImage;

    @Column(nullable = false)
    private Boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private ProductBrand brand;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images;

}
