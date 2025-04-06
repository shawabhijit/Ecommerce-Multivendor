package com.ecom.Repository;

import com.ecom.Entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<ReviewEntity, Long> {
    List<ReviewEntity> findByProduct(Long productId);
}
