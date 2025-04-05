package com.ecom.Service;

import com.ecom.Entity.CartItemEntity;

public interface CartItemService {

    public CartItemEntity updateCartItem(Long userID , Long id ,CartItemEntity cartItem) throws Exception;
    public void removeCartItem(Long userID , Long cartItemId) throws Exception;
    public CartItemEntity findCartItemById (Long id) throws Exception;

}
