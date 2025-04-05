package com.ecom.Service;

import com.ecom.Domain.OrderStatus;
import com.ecom.Entity.AddressEntity;
import com.ecom.Entity.CartEntity;
import com.ecom.Entity.OrderEntity;
import com.ecom.Entity.UserEntity;
import org.hibernate.query.Order;

import java.util.List;
import java.util.Set;

public interface OrderService {
    Set<OrderEntity> createOrder(UserEntity user , AddressEntity address , CartEntity cart);
    OrderEntity findOrderById(Long id);
    List<OrderEntity> userOrderHistory(Long userId);
    List<OrderEntity> sellerOrder(Long sellerId);
    OrderEntity updateOrderStatus(Long id, OrderStatus status);
    OrderEntity cancelOrder(Long id , UserEntity user);
}
