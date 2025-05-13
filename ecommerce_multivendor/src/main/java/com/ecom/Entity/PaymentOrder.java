package com.ecom.Entity;

import com.ecom.Domain.PaymentOrderStatus;
import com.ecom.Domain.PaymenyMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "verification_code")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long amount;

    @Enumerated(EnumType.STRING)
    private PaymentOrderStatus status = PaymentOrderStatus.PENDING;

    private PaymenyMethod paymenyMethod;

    private String paymentLinkId;

    @ManyToOne
    private UserEntity user;

    @OneToMany
    private List<OrderEntity> orders = new ArrayList<>();
}
