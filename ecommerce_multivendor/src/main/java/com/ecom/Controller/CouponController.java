package com.ecom.Controller;

import com.ecom.Entity.CartEntity;
import com.ecom.Entity.CouponEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Service.CartService;
import com.ecom.Service.CouponService;
import com.ecom.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CouponController {

    private final CouponService couponService;
    private final UserService userService;
    private final CartService cartService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyCoupon(@RequestParam String apply,
                                         @RequestParam String code,
                                         @RequestParam double orderValue,
                                         @RequestHeader("Authorization") String jwt
    ) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);

        CartEntity cart;

        if (apply.equals("true")) {
            cart = couponService.applyCoupon(code, orderValue, user);
        }
        else {
            cart = couponService.removeCoupon(code, user);
        }

        return ResponseEntity.ok().body(cart);
    }

    @PostMapping("/admin/create")
    public ResponseEntity<?> createCoupon(@RequestBody CouponEntity coupon) {
        CouponEntity createCoupon = couponService.createCoupon(coupon);
        return ResponseEntity.ok().body(createCoupon);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable Long id) throws Exception {
        couponService.deleteCoupon(id);
        return ResponseEntity.ok().body("Coupon deleted successfully");
    }

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllCoupons() throws Exception {
        return ResponseEntity.ok().body(couponService.findAllCoupons());
    }

}
