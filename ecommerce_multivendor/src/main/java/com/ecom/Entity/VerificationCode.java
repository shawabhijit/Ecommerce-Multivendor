package com.ecom.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "verification_code")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class VerificationCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String otp;

    private String email;

    @OneToOne
    private UserEntity user;

    @OneToOne
    private SellerEntity seller;
}
