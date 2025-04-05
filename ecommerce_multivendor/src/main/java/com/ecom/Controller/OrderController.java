package com.ecom.Controller;

import com.ecom.Domain.PaymenyMethod;
import com.ecom.Entity.*;
import com.ecom.Service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final CartService cartService;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;


    @PostMapping()
    public ResponseEntity<?> createOrderHandler (
            @RequestBody AddressEntity shippingAddress,
            @RequestParam PaymenyMethod paymenyMethod,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        CartEntity cart = cartService.findUserCart(user);
        Set<OrderEntity> orders = orderService.createOrder(user, shippingAddress, cart);

        // paymentOrder = paymenyService.createOrder(User,orders);

//        if (paymenyMethod.equals(PaymenyMethod.RAZORPAY)) {
//            PayL
//        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user")
    public ResponseEntity<?> userOrderHistoryHandle ( @RequestHeader("Authorization") String jwt) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        List<OrderEntity> orders = orderService.userOrderHistory(user.getId());
        return ResponseEntity.accepted().body(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable("orderId") Long orderId , @RequestHeader("Authorization") String jwt) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        OrderEntity order = orderService.findOrderById(orderId);
        return ResponseEntity.accepted().body(order);
    }

    @GetMapping("/order/{orderItemId}")
    public ResponseEntity<?> getOrderItemById(@PathVariable("orderItemId") Long orderItemId , @RequestHeader("Authorization") String jwt) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        OrderItemEntity orderItem = orderService.getOrderItemById(orderItemId);
        return ResponseEntity.accepted().body(orderItem);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable("orderId") Long orderId , @RequestHeader("Authorization") String jwt) throws Exception {
        UserEntity user = userService.findUserByJwtToken(jwt);
        OrderEntity order = orderService.cancelOrder(orderId,user);

        SellerEntity seller = sellerService.getSellerById(order.getSellerId());
        SellerReport report = sellerReportService.getSellerReport(seller);
        report.setCanceledOrders(report.getCanceledOrders());
        report.setTotalRefunds(report.getTotalRefunds() + order.getTotalSellingPrice());

        sellerReportService.updateSellerReport(report);

        return ResponseEntity.accepted().body(order);
    }
}
