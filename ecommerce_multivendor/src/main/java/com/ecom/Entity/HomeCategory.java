package com.ecom.Entity;

import com.ecom.Domain.HomeCategorySection;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "home-category")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class HomeCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String image;

    private String categoryId;

    private HomeCategorySection section;

}
