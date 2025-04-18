package com.ecom.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String title;

    private String description;

    private Integer mrpPrice;

    private Integer sellingPrice;

    private Integer discountPrice;

    private int quantity;

    private String color;

    @ElementCollection
    private List<String> images = new ArrayList<>();

    private int numRatings;

    @ManyToOne
    private CategoryEntity category;

    @ManyToOne
    private SellerEntity seller;

    private LocalDateTime createdAt;

    private String sizes;

    @OneToMany(mappedBy = "product" , cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ReviewEntity> reviews = new ArrayList<>();

}
