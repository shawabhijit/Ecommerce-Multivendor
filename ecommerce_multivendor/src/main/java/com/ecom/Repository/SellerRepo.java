package com.ecom.Repository;

import com.ecom.Entity.SellerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepo extends JpaRepository<SellerEntity, Long> {

    SellerEntity findByEmail(String email);
}
