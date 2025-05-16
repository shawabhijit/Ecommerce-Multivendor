package com.ecom.Entity;

import com.ecom.Domain.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String email;

    private String password;

    @Embedded
    private SiteDetails siteDetails = new SiteDetails();

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_ADMIN;
}
