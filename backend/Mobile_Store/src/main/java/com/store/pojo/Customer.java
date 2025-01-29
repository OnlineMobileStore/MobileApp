package com.store.pojo;
import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = { "password","address" })
@Entity
@Table(name = "customer")
public class Customer extends BaseEntity {

    @NotBlank(message = "First name is required")
    @Column(length = 50,nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Column(length = 50,nullable = false)
    private String lastName;

    @NotBlank(message = "Password is required")
    @Column(length = 200,nullable = false)
    private String password;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Column(length = 50,unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Column(length = 15,unique = true, nullable = false)
    private String phone;

    @JoinColumn(name="customer_address",nullable = false)
    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.EAGER,orphanRemoval = true)
    private CustomerAddress address;

}
