package com.ecom.Entity;

import com.ecom.Domain.PaymentOrderStatus;
import com.ecom.Domain.PaymenyMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "verification_code")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long amount;

    private PaymentOrderStatus status = PaymentOrderStatus.PENDING;

    private PaymenyMethod paymenyMethod;

    private String paymentLinkId;

    @ManyToOne
    private UserEntity user;

    @OneToMany
    private Set<OrderEntity> orders = new HashSet<>();
}
