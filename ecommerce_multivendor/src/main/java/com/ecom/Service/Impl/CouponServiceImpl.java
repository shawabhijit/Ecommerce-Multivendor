package com.ecom.Service.Impl;

import com.ecom.Entity.CartEntity;
import com.ecom.Entity.CouponEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Repository.CartRepo;
import com.ecom.Repository.CouponRepo;
import com.ecom.Repository.UserRepo;
import com.ecom.Service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepo couponRepo;
    private final CartRepo cartRepo;
    private final UserRepo userRepo;

    @Override
    public CartEntity applyCoupon(String couponCode, double orderValue, UserEntity user) throws Exception {
        CouponEntity coupon = couponRepo.findByCode(couponCode);
        CartEntity cart = cartRepo.findById(user.getId()).orElseThrow( () -> new RuntimeException("Coupon Not Found"));

        if (coupon == null) {
            throw new Exception("Coupon is not Valid..");
        }
        if (user.getUsedCoupons().contains(coupon)) {
            throw new Exception("Coupon is already used");
        }
        if (orderValue < coupon.getMinimumOrderValue()) {
            throw new Exception("Order value must be Greater than Coupon value");
        }
        if (coupon.isActive() && LocalDate.now().isAfter(coupon.getValidityStartDate())
                && LocalDate.now().isBefore(coupon.getValidityEndDate())) {
            user.getUsedCoupons().add(coupon);
            userRepo.save(user);

            double discountedPrice = (cart.getTotalSellingPrice()*coupon.getDiscountPercentage())/100;
            cart.setTotalSellingPrice(cart.getTotalSellingPrice()-discountedPrice);
            cart.setCouponCode(couponCode);
            return cartRepo.save(cart);
        }
        else {
            throw new Exception("Coupon Not Valid...");
        }
    }

    @Override
    public CartEntity removeCoupon(String couponCode, UserEntity user) throws Exception {
        CouponEntity coupon = couponRepo.findByCode(couponCode);
        if (coupon == null) {
            throw new Exception("Coupon not Found..");
        }
        CartEntity cart = cartRepo.findById(user.getId()).orElseThrow( () -> new RuntimeException("Cart Not Found"));
        double discountedPrice = (cart.getTotalSellingPrice()*coupon.getDiscountPercentage())/100;
        cart.setTotalSellingPrice(cart.getTotalSellingPrice()-discountedPrice);
        cart.setCouponCode(null);

        return cartRepo.save(cart);
    }

    @Override
    public CouponEntity findCouponById(Long id) throws Exception {
        return couponRepo.findById(id).orElseThrow(() -> new Exception("coupon not found with this id :" + id ));
    }

    @Override
    @PreAuthorize("hasRole ('ADMIN')")
    public CouponEntity createCoupon(CouponEntity coupon) {
        return couponRepo.save(coupon);
    }

    @Override
    public List<CouponEntity> findAllCoupons() {
        return couponRepo.findAll();
    }

    @Override
    @PreAuthorize("hasRole ('ADMIN')")
    public void deleteCoupon(Long id) throws Exception {
        CouponEntity coupon = this.findCouponById(id);
        couponRepo.deleteById(id);
    }
}
