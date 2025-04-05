package com.ecom.Repository;

import com.ecom.Entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<ProductEntity, Long> , JpaSpecificationExecutor<ProductEntity> {

    List<ProductEntity> findBySellerId(Long sellerId);

    @Query("SELECT p FROM ProductEntity p WHERE (:query is null or lower(p.title) like lower(concat('%', :query, '%') " +
            ") or (:query is null or lower(p.category.name) like lower(concat('%', :query, '%')) )  )")
    List<ProductEntity> searchProduct(@Param("query") String query);
}
