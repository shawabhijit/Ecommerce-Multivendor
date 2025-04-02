package com.ecom.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String title;

    private String description;

    private String mrpPrice;

    private String SellingPrice;

    private String discountPrice;

    private int quantity;

    private String color;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    private List<String> images = new ArrayList<>();

    private int numRatings;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private CategoryEntity category;
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private SellerEntity seller;

    private LocalDateTime createdAt;

    private String sizes;

    @OneToMany(mappedBy = "product" , cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ReviewEntity> reviews = new ArrayList<>();

}
