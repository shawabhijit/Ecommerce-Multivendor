package com.ecom.Service;

import com.ecom.Entity.OrderEntity;
import com.ecom.Entity.PaymentOrder;
import com.ecom.Entity.UserEntity;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

import java.util.Set;

public interface PaymentService {
    PaymentOrder createOrder(UserEntity user , Set<OrderEntity> orders);
    PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
    PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception;
    Boolean proceedPaymentOrder (PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException;
    PaymentLink creteRazorpayPaymentLink(UserEntity user , Long amount, Long orderId) throws RazorpayException;

    String createStripePaymentLink(UserEntity user , Long amount, Long orderId) throws StripeException;
}
