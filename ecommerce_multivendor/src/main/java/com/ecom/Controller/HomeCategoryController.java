package com.ecom.Controller;

import com.ecom.Entity.HomeCategory;
import com.ecom.Entity.HomePage;
import com.ecom.Service.HomeCategoryService;
import com.ecom.Service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class HomeCategoryController {
    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @PostMapping("/admin/home/categories")
    public ResponseEntity<?> createHomeCategories(@RequestBody List<HomeCategory> homeCategories) {
        List<HomeCategory> categories = homeCategoryService.createHomeCategories(homeCategories);
        HomePage home = homeService.createHomePageData(categories);
        return ResponseEntity.accepted().body(home);
    }

    @GetMapping("/home-category")
    public ResponseEntity<?> getHomeCategory() {
        List<HomeCategory> categories = homeCategoryService.findAllHomeCategories();
        return ResponseEntity.ok().body(categories);
    }

    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody HomeCategory homeCategory) throws Exception {
        HomeCategory updatedCategory = homeCategoryService.updateHomeCategory(homeCategory,id);
        return ResponseEntity.ok().body(updatedCategory);
    }
}
