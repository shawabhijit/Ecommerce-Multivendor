package com.ecom.Service;

import com.ecom.Entity.HomeCategory;
import com.ecom.Entity.HomePage;

import java.util.List;

public interface HomeService {
    public HomePage createHomePageData(List<HomeCategory> allCategories);
}
