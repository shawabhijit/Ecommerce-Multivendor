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
        WishList wishList = new WishList();
        wishList.setUser(user);
        return wishListRepo.save(wishList);
    }

    @Override
    public WishList getWishListByUserId(UserEntity user) {
        WishList wishList = wishListRepo.findByUserId(user.getId());
        if (wishList == null) {
            wishList = this.createWishList(user);
        }
        return wishList;
    }

    @Override
    public WishList addProductToWishList(UserEntity user, ProductEntity product) {
        WishList wishList = getWishListByUserId(user);

        if (wishList.getProducts().contains(product)) {
            wishList.getProducts().remove(product);
        }
        else {
            wishList.getProducts().add(product);
        }
        return wishListRepo.save(wishList);
    }
}
