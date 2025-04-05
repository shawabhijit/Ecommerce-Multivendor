package com.ecom.Service.Impl;

import com.ecom.Entity.CartItemEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Repository.CartItemRepo;
import com.ecom.Service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepo cartItemRepo;

    @Override
    public CartItemEntity updateCartItem(Long userID, Long id, CartItemEntity cartItem) throws Exception {
        CartItemEntity item = findCartItemById(id);
        UserEntity cartItemUser = item.getCart().getUser();

        if (cartItemUser.getId().equals(userID)) {
            item.setQuantity(cartItem.getQuantity());
            item.setMrpPrice(item.getQuantity()*item.getProduct().getMrpPrice());
            item.setSellingPrice(item.getQuantity()*item.getProduct().getSellingPrice());
            return cartItemRepo.save(item);
        }
        else {
            throw new Exception("You cant update this cart item");
        }
    }

    @Override
    public void removeCartItem(Long userID, Long cartItemId) throws Exception {
        CartItemEntity item = findCartItemById(cartItemId);
        UserEntity cartItemUser = item.getCart().getUser();

        if(cartItemUser.getId().equals(userID)) {
            cartItemRepo.delete(item);
        }
        else {
            throw new Exception("YOu cant delete this item");
        }
    }

    @Override
    public CartItemEntity findCartItemById(Long id) throws Exception {
        return cartItemRepo.findById(id).orElseThrow( () ->  new Exception("Cart item not found."));
    }
}
