package com.ecom.Service.Impl;

import com.ecom.Domain.OrderStatus;
import com.ecom.Domain.PaymentStatus;
import com.ecom.Entity.*;
import com.ecom.Exceptions.OrderException;
import com.ecom.Repository.AddressRepo;
import com.ecom.Repository.OrderItemRepo;
import com.ecom.Repository.OrderRepo;
import com.ecom.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;
    private final AddressRepo addressRepo;
    private final OrderItemRepo orderItemRepo;

    @Override
    public List<OrderEntity> createOrder(UserEntity user, AddressEntity shippingAddress, CartEntity cart) {
        if (!user.getAddresses().contains(shippingAddress)) {
            user.getAddresses().add(shippingAddress);
        }
        AddressEntity address = addressRepo.save(shippingAddress);

        Map<Long , List<CartItemEntity>> itemsBySeller = cart.getCartItems()
                .stream().collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));

        List<OrderEntity> orders = new ArrayList<>();

        for (Map.Entry<Long , List<CartItemEntity>> entry : itemsBySeller.entrySet()) {
            Long sellerId = entry.getKey();
            List<CartItemEntity> items = entry.getValue();

            int totalOrderPrice = items.stream().mapToInt(CartItemEntity::getSellingPrice).sum();
            int totalItem = items.stream().mapToInt(CartItemEntity::getQuantity).sum();

            OrderEntity createdOrder = new OrderEntity();
            createdOrder.setUser(user);
            createdOrder.setSellerId(sellerId);
            createdOrder.setTotalMrpPrice(totalOrderPrice);
            createdOrder.setTotalSellingPrice(totalOrderPrice);
            createdOrder.setTotalItem(totalItem);
            createdOrder.setShippingAddress(address);
            createdOrder.setOrderStatus(OrderStatus.PENDING);
            createdOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);

            OrderEntity order = orderRepo.save(createdOrder);
            orders.add(order);
            List<OrderItemEntity> orderItems = new ArrayList<>();

            for (CartItemEntity item : items) {
                OrderItemEntity orderItem = new OrderItemEntity();
                orderItem.setOrder(order);
                orderItem.setQuantity(item.getQuantity());
                orderItem.setSellingPrice(item.getSellingPrice());
                orderItem.setMrpPrice(item.getMrpPrice());
                orderItem.setProduct(item.getProduct());
                orderItem.setSize(item.getSize());
                orderItem.setUserId(item.getUserId());
                order.getOrderItems().add(orderItem);

                OrderItemEntity savedOrderItem = orderItemRepo.save(orderItem);
                orderItems.add(savedOrderItem);
            }
        }
        return orders;
    }

    @Override
    public OrderEntity findOrderById(Long id) throws OrderException {
        return orderRepo.findById(id).orElseThrow( () -> new OrderException("Order not found..."));
    }

    @Override
    public List<OrderEntity> userOrderHistory(Long userId) {
        return orderRepo.findByUserId(userId);
    }

    @Override
    public List<OrderEntity> sellerOrder(Long sellerId) {
        return orderRepo.findBySellerId(sellerId);
    }

    @Override
    public OrderEntity updateOrderStatus(Long id, OrderStatus status) throws OrderException {

        OrderEntity order = this.findOrderById(id);
        order.setOrderStatus(status);

        return orderRepo.save(order);
    }

    @Override
    public OrderEntity cancelOrder(Long id, UserEntity user) throws OrderException {

        OrderEntity order = this.findOrderById(id);

        if (!user.getId().equals(order.getUser().getId())) {
            throw new OrderException("You dont have permission to cancel this order");
        }

        order.setOrderStatus(OrderStatus.CANCELLED);

        return orderRepo.save(order);
    }

    @Override
    public OrderItemEntity getOrderItemById(Long id) throws OrderException {
        return orderItemRepo.findById(id).orElseThrow( () ->  new OrderException("Order Item not exits...."));
    }

}
