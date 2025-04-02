package com.ecom.Entity;

import com.ecom.Domain.AccountStatus;
import com.ecom.Domain.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seller")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class SellerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sellerName;

    @Column(nullable = false , unique = true)
    private String email;

    private String password;

    private String mobile;

    @Embedded
    private BusinessDetails businessDetails = new BusinessDetails();

    @Embedded
    private BankDetails bankDetails = new BankDetails();

    @OneToOne(cascade = CascadeType.ALL)
    private AddressEntity pickupAddress = new AddressEntity();

    private UserRole role = UserRole.ROLE_SELLER;

    private boolean isEmailVerified = false;

    private AccountStatus accountStatus = AccountStatus.PENDING_VERIFICATION;

}
