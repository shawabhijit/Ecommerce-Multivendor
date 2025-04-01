package com.ecom.Entity;

import com.ecom.Domain.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "User_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String email;

    private String phone;

    private UserRole role = UserRole.ROLE_CUSTOMER;

    @OneToMany
    private Set<AddressEntity> addresses = new HashSet<>();

    @ManyToMany
    @JsonIgnore  // by using JsonIgnore this property will not go to frontend
    private Set<CouponEntity> usedCoupons = new HashSet<>();
}
