package com.ecom.Repository;

import com.ecom.Entity.CartEntity;
import com.ecom.Entity.CartItemEntity;
import com.ecom.Entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepo extends JpaRepository<CartItemEntity, Long> {

    CartItemEntity findByCartAndProductAndSize(CartEntity cart, ProductEntity product, String size);

}
