package com.ecom.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart-item")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
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

    private Integer mrpPrice=0;

    @JsonProperty("sellingPrice")
    private Integer sellingPrice;

    @JsonProperty("userId")
    private Long userId;

}
