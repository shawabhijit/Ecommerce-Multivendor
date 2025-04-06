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
        return homeCategoryRepo.save(homeCategory);
    }

    @Override
    public List<HomeCategory> createHomeCategories(List<HomeCategory> homeCategories) {
        if(homeCategoryRepo.findAll().isEmpty()){
            return homeCategoryRepo.saveAll(homeCategories);
        }
        return homeCategoryRepo.findAll();
    }

    @Override
    public HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id) throws Exception {
        HomeCategory existing = homeCategoryRepo.findById(id).orElseThrow( () -> new Exception("Category not found.."));
        if (homeCategory.getCategoryId() != null) {
            existing.setCategoryId(homeCategory.getCategoryId());
        }
        if (homeCategory.getImage() != null) {
            existing.setImage(homeCategory.getImage());
        }
        return homeCategoryRepo.save(existing);
    }

    @Override
    public List<HomeCategory> findAllHomeCategories() {
        return homeCategoryRepo.findAll();
    }
}
