package com.ecom.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "address")
public class AddressEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String pickupBusinessName;

    private String locality;

    private String pickupAddress;

    private String pickupCity;

    private String pickupState;

    private String pinCode;

    private String pickupPhone;

    private String pickupZipCode;

//    @Column(nullable = true)
    private Boolean Default;
}
