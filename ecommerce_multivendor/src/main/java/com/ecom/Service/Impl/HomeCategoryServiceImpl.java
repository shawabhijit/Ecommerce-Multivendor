package com.ecom.Service.Impl;

import com.ecom.Entity.HomeCategory;
import com.ecom.Repository.HomeCategoryRepo;
import com.ecom.Service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {

    private final HomeCategoryRepo homeCategoryRepo;

    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return null;
    }

    @Override
    public List<HomeCategory> createHomeCategories(List<HomeCategory> homeCategories) {
        return List.of();
    }

    @Override
    public HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id) {
        return null;
    }

    @Override
    public List<HomeCategory> findAllHomeCategories() {
        return List.of();
    }
}
