package com.ecom.Service.Impl;

import com.ecom.Repository.CouponRepo;
import com.ecom.Service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepo couponRepo;
}
