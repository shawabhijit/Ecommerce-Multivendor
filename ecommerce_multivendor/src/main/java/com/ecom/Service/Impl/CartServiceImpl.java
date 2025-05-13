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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepo cartRepo;
    private final ProductService productService;
    private final CartItemRepo cartItemRepo;


    @Override
    public CartItemEntity addCartItem(UserEntity user, ProductEntity product, String size, int quantity) throws Exception {
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

            CartItemEntity savedItem = cartItemRepo.save(cartItem);
            // Force a refresh of the cart to ensure all items are properly persisted
            cartRepo.save(cart);
            return savedItem;
        }
        else {
            throw new Exception("Product Already exits in the cart , please change something.");
        }
    }

    @Override
    @Transactional
    public CartEntity findUserCart(UserEntity user) {
        CartEntity cart = cartRepo.findByUserId(user.getId());

        List<CartItemEntity> cartItems = cartItemRepo.findByCart(cart);

        cart.getCartItems().clear();
        cart.getCartItems().addAll(cartItems);

        int totalPrice = 0;
        int totalItem = 0;
        int totalDiscountPrice = 0;

        System.out.println("Total cart items found: " + cart.getCartItems().size());

        for (CartItemEntity item : cartItems) {
            System.out.println("Processing cart item ID: " + item.getId());
            totalPrice += item.getMrpPrice();
            totalDiscountPrice += item.getSellingPrice();
            totalItem += item.getQuantity();
        }

        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalSellingPrice(totalDiscountPrice);
        cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountPrice));

        return cartRepo.save(cart);
    }

    private int calculateDiscountPercentage(double mrpPrice, double sellingPrice) {
        if (mrpPrice <= 0) {
            return 0; // Avoid division by zero or negative percentages
        }
        double discount = mrpPrice-sellingPrice;
        double discountPercentage = (discount/mrpPrice)*100;
        return (int) discountPercentage;
    }
}