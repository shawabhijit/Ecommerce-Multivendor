package com.ecom.Entity;

import com.ecom.Domain.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@Table(name = "User_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonIgnore
    private String password;

    private String email;

    private String phone;

    private String gender;

    private String dob;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_CUSTOMER;

    @OneToMany
    private List<AddressEntity> addresses = new ArrayList<>();

    @ManyToMany
    @JsonIgnore  // by using JsonIgnore this property will not go to frontend
    private Set<CouponEntity> usedCoupons = new HashSet<>();
}
