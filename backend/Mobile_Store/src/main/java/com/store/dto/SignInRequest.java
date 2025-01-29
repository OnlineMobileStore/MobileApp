package com.store.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true, exclude = { "password" })
public class SignInRequest {

	 @Email(message = "Invalid email format")
	 @NotBlank(message = "Email is required")
	 private String email;
	 
    @NotBlank(message = "Password is required")
    private String password;

}
