package com.ecom.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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

    private String sizes;

    private String status; // active/inactive

    private String sku;

    private String barcode;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @ElementCollection
    private List<String> images = new ArrayList<>();

    @ElementCollection
    private List<String> tags = new ArrayList<>();

    private int numRatings;

    @ManyToOne
    private CategoryEntity category;

    @ManyToOne
    private SellerEntity seller;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewEntity> reviews = new ArrayList<>();

    // ✅ Nested POJO fields stored as JSON

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<Variant> variants = new ArrayList<>();

//    @JdbcTypeCode(SqlTypes.JSON)
//    @Column(columnDefinition = "jsonb")
    @Embedded
    private SEO seo;

//    @JdbcTypeCode(SqlTypes.JSON)
//    @Column(columnDefinition = "jsonb")
    @Embedded
    private Shipping shipping;

//    @JdbcTypeCode(SqlTypes.JSON)
//    @Column(columnDefinition = "jsonb")
    @Embedded
    private Ratings ratings;
}
