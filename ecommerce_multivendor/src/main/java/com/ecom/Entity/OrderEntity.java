package com.ecom.Entity;

import com.ecom.Domain.OrderStatus;
import com.ecom.Domain.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "order")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;

    @ManyToOne
    private UserEntity user;

    private Long sellerId;

    @OneToMany(mappedBy = "order" , cascade = CascadeType.ALL , orphanRemoval = true)
    private List<OrderItemEntity> orderItems = new ArrayList<>();

    @ManyToOne
    private AddressEntity shippingAddress;

    @Embedded
    private PaymentDetails paymentDetails=new PaymentDetails();

    private double totalMrpPrice;

    private Integer totalSellingPrice;

    private Integer discount;

    private OrderStatus orderStatus;

    private int totalItem;

    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    private LocalDateTime orderDate = LocalDateTime.now();
    private LocalDateTime deliveryDate = orderDate.plusDays(7);

}
