package com.ecom.Service;

import com.ecom.Entity.CartEntity;
import com.ecom.Entity.CouponEntity;
import com.ecom.Entity.UserEntity;

import java.util.List;

public interface CouponService {
    CartEntity applyCoupon(String couponCode, double orderValue , UserEntity user) throws Exception;
    CartEntity removeCoupon(String couponCode , UserEntity user) throws Exception;
    CouponEntity findCouponById(Long id) throws Exception;
    CouponEntity createCoupon(CouponEntity coupon);
    List<CouponEntity> findAllCoupons();
    void deleteCoupon(Long id) throws Exception;
}
