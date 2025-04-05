package com.ecom.Controller;

import com.ecom.Domain.OrderStatus;
import com.ecom.Entity.OrderEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Service.OrderService;
import com.ecom.Service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/orders")
public class SellerOrderController {

    private final OrderService orderService;
    private final SellerService sellerService;

    @GetMapping()
    public ResponseEntity<?> getAllOrdersHandler (@RequestHeader("Authorization") String jwt) throws Exception {
        SellerEntity seller = sellerService.getSellerProfile(jwt);
        List<OrderEntity> orders = orderService.sellerOrder(seller.getId());
        return ResponseEntity.accepted().body(orders);
    }

    @PatchMapping("/{orderId}/status/{orderStatus}")
    public ResponseEntity<?> updateOrderHandler (
            @PathVariable Long orderId,
            @PathVariable OrderStatus orderStatus,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        OrderEntity orders = orderService.updateOrderStatus(orderId, orderStatus);
        return ResponseEntity.accepted().body(orders);
    }
}
