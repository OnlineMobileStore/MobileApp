package com.store.pojo;
import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = { "order","product" })
@Entity
@Table(name = "order_details")
public class OrderDetails extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private CustomerOrder order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Positive(message = "Price must be positive")
    @Column(nullable = false)
    private Double price;

    @Positive(message = "Quantity must be positive")
    @Column(nullable = false)
    private Integer quantity;
}