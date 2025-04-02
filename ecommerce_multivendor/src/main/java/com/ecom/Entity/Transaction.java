package com.ecom.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "transection")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserEntity customer;

    @ManyToOne
    private SellerEntity seller;

    @OneToOne
    private OrderEntity order;

    private LocalDateTime date = LocalDateTime.now();
}
