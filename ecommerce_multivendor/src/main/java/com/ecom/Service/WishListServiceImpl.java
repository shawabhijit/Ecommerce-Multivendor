package com.ecom.Service;

import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Entity.WishList;
import com.ecom.Repository.WishListRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {

    private final WishListRepo wishListRepo;

    @Override
    public WishList createWishList(UserEntity user) {
        return null;
    }

    @Override
    public WishList getWishListByUserId(UserEntity user) {
        return null;
    }

    @Override
    public WishList addProductToWishList(UserEntity user, ProductEntity product) {
        return null;
    }
}
