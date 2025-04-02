package com.ecom.Entity;


import jakarta.persistence.*;

import lombok.Data;

import java.util.List;


@Data
public class HomePage {

    private List<HomeCategory> grid;

    private List<HomeCategory> shopByCategories;

    private List<HomeCategory> dealsCategories;

    private List<HomeCategory> electricCategories;

    private List<DealEntity> deals;
}
