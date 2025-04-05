package com.ecom.Repository;

import com.ecom.Entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<CategoryEntity, Long> {

    CategoryEntity findByCategoryId (String categoryId);
}
