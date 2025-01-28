package com.store.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Disable CSRF for simplicity; enable it in production
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/customer/register", "/customer/login","/v*/api-doc*/**","/swagger-ui/**").permitAll() // Allow public access
                .anyRequest().authenticated() // Require authentication for all other endpoints
            );

        return http.build();
    }
}
