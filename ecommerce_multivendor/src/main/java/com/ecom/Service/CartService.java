package com.ecom.Service;

import com.ecom.Entity.CartEntity;
import com.ecom.Entity.CartItemEntity;
import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.UserEntity;

public interface CartService {

    public CartItemEntity addCartItem(
            UserEntity user,
            ProductEntity product,
            String size,
            int quantity
    );

    public CartEntity findUserCart (UserEntity user);

}
