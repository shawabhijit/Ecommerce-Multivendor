package com.ecom.Service;

import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Entity.WishList;

public interface WishListService {

    WishList createWishList(UserEntity user);
    WishList getWishListByUserId(UserEntity user);
    WishList addProductToWishList(UserEntity user, ProductEntity product);
    WishList getWishListByProductId(UserEntity user, ProductEntity product) throws Exception;
}
