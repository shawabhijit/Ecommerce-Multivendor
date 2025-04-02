package com.ecom.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "deal")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class DealEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer discount;

    @OneToOne
    private HomeCategory category;
}
