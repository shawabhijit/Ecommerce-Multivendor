package com.ecom.Repository;

import com.ecom.Domain.AccountStatus;
import com.ecom.Entity.SellerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerRepo extends JpaRepository<SellerEntity, Long> {

    SellerEntity findByEmail(String email);
    List<SellerEntity> findByAccountStatus(AccountStatus accountStatus);
}
