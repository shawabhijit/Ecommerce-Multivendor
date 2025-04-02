package com.ecom.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "wish_list")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class WishList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private UserEntity user;

    @ManyToMany
    private Set<ProductEntity> products = new HashSet<>();

}
