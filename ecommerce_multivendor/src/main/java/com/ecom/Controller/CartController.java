package com.ecom.Controller;

import com.ecom.Entity.CartEntity;
import com.ecom.Entity.CartItemEntity;
import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Exceptions.ProductException;
import com.ecom.Request.AddItemRequest;
import com.ecom.Response.ApiResponse;
import com.ecom.Service.CartItemService;
import com.ecom.Service.CartService;
import com.ecom.Service.ProductService;
import com.ecom.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;
    private final CartItemService cartItemService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<?> findUserCartHandler (@RequestHeader("Authorization") String jwt) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        CartEntity cart = cartService.findUserCart(user);

        return ResponseEntity.ok().body(cart);
    }

    @PutMapping("/add")
    public ResponseEntity<?> addItemCart(@RequestBody AddItemRequest req , @RequestHeader("Authorization") String jwt) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        ProductEntity prod = productService.findProductById(req.getProductId());

        CartItemEntity cartItem = cartService.addCartItem(user,prod,req.getSize(),req.getQuantity());

        ApiResponse res = new ApiResponse("Item Added to cart Successfully",true);

        return ResponseEntity.accepted().body(cartItem);
    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<?> deleteItemCart(@PathVariable Long cartItemId, @RequestHeader("Authorization") String jwt) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        cartItemService.removeCartItem(user.getId(),cartItemId);
        ApiResponse res = new ApiResponse("Item Deleted from cart Successfully",true);
        return ResponseEntity.accepted().body(res);
    }

    @PutMapping("/item/update/{cartItemId}")
    public ResponseEntity<?> updateCartItemHandler (@PathVariable Long cartItemId ,
                                                    @RequestBody CartItemEntity cartItemEntity,
                                                    @RequestHeader("Authorization") String jwt
    ) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        CartItemEntity updateCartItem = null;

        if (cartItemEntity.getQuantity() > 0) {
            updateCartItem = cartItemService.updateCartItem(user.getId(),cartItemId,cartItemEntity);
        }

        return ResponseEntity.accepted().body(updateCartItem);
    }

}
