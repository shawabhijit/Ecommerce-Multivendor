package com.ecom.Repository;

import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<ReviewEntity, Long> {

    @Query("SELECT r FROM ReviewEntity r WHERE r.product.id = :productId")
    List<ReviewEntity> findByProduct(@Param("productId") Long productId);

}
