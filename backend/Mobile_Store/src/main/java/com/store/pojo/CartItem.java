package com.store.pojo;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart; // Many items belong to one cart

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // A cart item refers to a product

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(nullable = false)
    private Integer quantity;

   // @NotNull(message = "Price cannot be null")
    @Column(nullable = true)
    private Double price; // Store price at the time of adding to cart

    // Calculate total price for this cart item
    public Double getTotalPrice() {
        return this.quantity * this.price;
    }
}
