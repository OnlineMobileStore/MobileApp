package com.store.pojo;
import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = { "password" })
@Entity
@Table(name = "admin")
public class Admin extends BaseEntity{

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
    @Column(length = 200,unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Column(length = 15,unique = true, nullable = false)
    private String phone;

}