package com.store.pojo;
import lombok.*;

import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString(callSuper = true)
@Table(name = "cart")
public class Cart extends BaseEntity {
	
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Positive(message = "Quantity must be positive")
    @Column(nullable = false)
    private Integer quantity;
    
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems;
    
    public void addCartItem(CartItem cart) {
		this.cartItems.add(cart);
		cart.setCart(this);
	}

//	public void removeBlogPost(BlogPost post) {
//		this.blogPosts.remove(post);
//		post.setBlogCategory(null);
//	}
//    
    
}
