package com.ecom.Service.Impl;

import com.ecom.Domain.OrderStatus;
import com.ecom.Entity.AddressEntity;
import com.ecom.Entity.CartEntity;
import com.ecom.Entity.OrderEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Repository.OrderRepo;
import com.ecom.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;

    @Override
    public Set<OrderEntity> createOrder(UserEntity user, AddressEntity address, CartEntity cart) {
        return Set.of();
    }

    @Override
    public OrderEntity findOrderById(Long id) {
        return null;
    }

    @Override
    public List<OrderEntity> userOrderHistory(Long userId) {
        return List.of();
    }

    @Override
    public List<OrderEntity> sellerOrder(Long sellerId) {
        return List.of();
    }

    @Override
    public OrderEntity updateOrderStatus(Long id, OrderStatus status) {
        return null;
    }

    @Override
    public OrderEntity cancelOrder(Long id, UserEntity user) {
        return null;
    }
}
