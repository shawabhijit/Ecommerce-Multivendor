package com.ecom.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart-item")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CartItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private CartEntity cart;

    @ManyToOne
    private ProductEntity product;

    private String size;

    private int quantity = 1;

    private Integer mrpPrice;

    private Integer SellingPrice;

    private Long UserId;

}
