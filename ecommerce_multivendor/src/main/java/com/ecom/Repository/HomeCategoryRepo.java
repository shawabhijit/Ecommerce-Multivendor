package com.ecom.Repository;

import com.ecom.Entity.HomeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeCategoryRepo extends JpaRepository<HomeCategory, Long> {

}
