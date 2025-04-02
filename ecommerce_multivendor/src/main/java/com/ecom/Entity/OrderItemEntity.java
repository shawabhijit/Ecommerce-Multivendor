package com.ecom.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order-item")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private ProductEntity product;

    @ManyToOne
    private OrderEntity order;

    private String size;

    private int quantity;

    private Integer mrpPrice;

    private Integer sellingPrice;

    private Long userId;
}
