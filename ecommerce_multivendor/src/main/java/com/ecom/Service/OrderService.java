package com.ecom.Service;

import com.ecom.Domain.OrderStatus;
import com.ecom.Entity.*;
import com.ecom.Exceptions.OrderException;
import org.hibernate.query.Order;

import java.util.List;
import java.util.Set;

public interface OrderService {
    List<OrderEntity> getAllOrders();
    List<OrderEntity> createOrder(UserEntity user , AddressEntity address , CartEntity cart);
    OrderEntity findOrderById(Long id) throws OrderException;
    List<OrderEntity> userOrderHistory(Long userId);
    List<OrderEntity> sellerOrder(Long sellerId);
    OrderEntity updateOrderStatus(Long id, OrderStatus status) throws OrderException;
    OrderEntity cancelOrder(Long id , UserEntity user) throws OrderException;
    OrderItemEntity getOrderItemById(Long id) throws OrderException;
}
