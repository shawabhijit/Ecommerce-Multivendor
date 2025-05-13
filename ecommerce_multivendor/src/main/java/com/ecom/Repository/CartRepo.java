package com.ecom.Repository;

import com.ecom.Entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<CartEntity, Long> {
//    CartEntity findByUserId(Long userId);
    @Query("SELECT c FROM CartEntity c LEFT JOIN FETCH c.cartItems WHERE c.user.id = :userId")
    CartEntity findByUserId(@Param("userId") Long userId);
}
