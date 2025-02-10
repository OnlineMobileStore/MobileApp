// package com.store.security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;

// @Configuration
// public class SecurityConfig {

//     @Bean
//     PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//                 .csrf(csrf -> csrf.disable())
//                 .authorizeHttpRequests(auth -> auth
//                                 .requestMatchers("/auth/register-customer", "/auth/login-customer", "/auth/register-admin", "/auth/login-admin", "/product*/**","/brand*/**","orders*/**", "/admin*/**", "/customer*/**","/reviews*/**","/faqs*/**","/sales*/**","/v*/api-doc*/**", "/swagger-ui/**").permitAll() // Allow public access
//                                 .anyRequest().authenticated()
//                 );

//         return http.build();
//     }
// }

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
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/auth/register-customer",
                                "/auth/login-customer",
                                "/auth/register-admin",
                                "/auth/login-admin",
                                "/product*/**",
                                "/brand*/**",
                                "orders*/**",
                                "/admin*/**",
                                "/customer*/**",
                                "/reviews*/**",
                                "/faqs*/**",
                                "/sales*/**",
                                "/customer/wishlist*/**",
                                "/v*/api-doc*/**",
                                "/swagger-ui/**"
                        ).permitAll() // Allow public access
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
