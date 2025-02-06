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

    @Column(nullable = false, length = 20)
    private String color;

    @Column(nullable = false)
    private Integer ram;

    @Column(nullable = false, length = 20)
    private Integer camera;

    @Column(nullable = false)
    private Integer storage;

    @Column(nullable = false, length = 20)
    private String os;

    private Integer battery;

    private Double screenSize;

    private Integer quantity;

    @NotBlank(message = "Primary image is required")
    private String primaryImage;

    @Column(nullable = false)
    private Boolean isActive = true;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "brand_id", nullable = false)
    private ProductBrand brand;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private List<ProductImage> images;

}
