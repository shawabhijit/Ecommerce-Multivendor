package com.ecom.Service.Impl;

import com.ecom.Entity.CartEntity;
import com.ecom.Entity.CartItemEntity;
import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Repository.CartItemRepo;
import com.ecom.Repository.CartRepo;
import com.ecom.Service.CartService;
import com.ecom.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepo cartRepo;
    private final ProductService productService;
    private final CartItemRepo cartItemRepo;


    @Override
    public CartItemEntity addCartItem(UserEntity user, ProductEntity product, String size, int quantity) {
        CartEntity cart = this.findUserCart(user);

        CartItemEntity cartItem = cartItemRepo.findByCartAndProductAndSize(cart, product, size);

        if (cartItem == null) {
            cartItem = new CartItemEntity();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(user.getId());
            cartItem.setSize(size);

            int totalPrice = quantity * product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);
            cartItem.setMrpPrice(quantity*product.getMrpPrice());
            cart.getCartItems().add(cartItem);
            cartItem.setCart(cart);

            return cartItemRepo.save(cartItem);
        }
        return cartItem;
    }

    @Override
    public CartEntity findUserCart(UserEntity user) {
        CartEntity cart = cartRepo.findByUser(user.getId());

        int totalPrice = 0;
        int totalItem = 0;
        int totalDiscountPrice = 0;

        for (CartItemEntity cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getMrpPrice();
            totalDiscountPrice += cartItem.getSellingPrice();
            totalItem += cartItem.getQuantity();
        }

        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalSellingPrice(totalDiscountPrice);
        cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountPrice));
        return cart;
    }

    private int calculateDiscountPercentage(double mrpPrice , double sellingPrice) {
        if (mrpPrice <= 0) {
            throw new IllegalArgumentException("MrpPrice must be greater than 0");
        }
        double discount = mrpPrice-sellingPrice;
        double discountPercentage = (discount/mrpPrice)*100;
        return (int) discountPercentage;
    }
}
