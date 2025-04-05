package com.ecom.Service;

import com.ecom.Domain.OrderStatus;
import com.ecom.Entity.*;
import org.hibernate.query.Order;

import java.util.List;
import java.util.Set;

public interface OrderService {
    Set<OrderEntity> createOrder(UserEntity user , AddressEntity address , CartEntity cart);
    OrderEntity findOrderById(Long id) throws Exception;
    List<OrderEntity> userOrderHistory(Long userId);
    List<OrderEntity> sellerOrder(Long sellerId);
    OrderEntity updateOrderStatus(Long id, OrderStatus status) throws Exception;
    OrderEntity cancelOrder(Long id , UserEntity user) throws Exception;
    OrderItemEntity getOrderItemById(Long id) throws Exception;
}
