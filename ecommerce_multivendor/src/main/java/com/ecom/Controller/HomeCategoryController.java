package com.ecom.Controller;

import com.ecom.Entity.HomeCategory;
import com.ecom.Service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class HomeCategoryController {
    private final HomeCategoryService homeCategoryService;
//    private final

    @PostMapping("/home/categories")
    public ResponseEntity<HomeCategory> createHomeCategories(@RequestBody List<HomeCategory> homeCategories) {
        List<HomeCategory> categories = homeCategoryService.createHomeCategories(homeCategories);

        return ResponseEntity.accepted().body(home);
    }

}
