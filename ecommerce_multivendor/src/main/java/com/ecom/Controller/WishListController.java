package com.ecom.Controller;

import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Entity.WishList;
import com.ecom.Service.ProductService;
import com.ecom.Service.UserService;
import com.ecom.Service.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishListController  {
    private final WishListService wishListService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<?> getWishListByUserId(@CookieValue(name = "jwt" , required = false) String jwt) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        WishList wishList = wishListService.getWishListByUserId(user);
        return ResponseEntity.ok().body(wishList);
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<?> addProductTOWishList(@CookieValue(name = "jwt" , required = false) String jwt, @PathVariable Long productId) throws Exception {
        ProductEntity product = productService.findProductById(productId);
        UserEntity user = userService.findUserByJwtToken(jwt);

        WishList wishList = wishListService.addProductToWishList(user, product);
        return ResponseEntity.ok().body(wishList);
    }
}
