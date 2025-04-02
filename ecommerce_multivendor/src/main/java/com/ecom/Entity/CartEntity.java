package com.ecom.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cart")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cartId;

    @OneToOne
    private UserEntity user;

    @OneToMany(mappedBy = "cart" , cascade = CascadeType.ALL , orphanRemoval = true)
    private Set<CartItemEntity> cartItems = new HashSet<>();

    private double totalSellingPrice;

    private int totalItem;

    private int totalMrpPrice;

    private int discount;

    private String couponCode;
}
