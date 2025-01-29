package com.store.pojo;
import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "faqs")
public class FAQ extends BaseEntity{
    @NotBlank(message = "Question is required")
    @Column(nullable = false, length = 2000)
    private String question;

    private String answer;
}