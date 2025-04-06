package com.ecom.Repository;

import com.ecom.Entity.CouponEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepo extends JpaRepository<CouponEntity, Long> {
}
