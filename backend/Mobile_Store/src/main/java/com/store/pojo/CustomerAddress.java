package com.store.pojo;
import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer_addresses")
public class CustomerAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Address1 is required")
    @Column(nullable = false)
    private String address1;

    private String address2;

    @NotBlank(message = "City is required")
    @Column(nullable = false)
    private String city;

    @NotBlank(message = "State is required")
    @Column(nullable = false)
    private String state;

    @NotBlank(message = "Zipcode is required")
    @Column(nullable = false)
    private String zipcode;

    @Column(nullable = false)
    private Boolean isActive = true;

    @OneToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
}
