package com.ecom.Service.Impl;

import com.ecom.Domain.PaymentOrderStatus;
import com.ecom.Domain.PaymentStatus;
import com.ecom.Entity.OrderEntity;
import com.ecom.Entity.PaymentOrder;
import com.ecom.Entity.UserEntity;
import com.ecom.Exceptions.PaymentExceptions;
import com.ecom.Repository.OrderRepo;
import com.ecom.Repository.PaymentOrderRepo;
import com.ecom.Service.PaymentService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor

public class PaymentServiceImpl implements PaymentService {

    private final PaymentOrderRepo paymentOrderRepo;
    private final OrderRepo orderRepo;

    private final String apiKey = "rzp_test_fHAM9vlitExOQI";
    private final String apiSecret = "2ggGKtnLAW8hWDgTLhTEdfMc";
    private final String stripeApiKey = "sk_test_51RAxAm06fEIM4VuNEZcWJmjPLjXNRUoee9AZjarVl1F7b9IZjZMFdzZxtUY8peB0hVTEySpEwufjLDYNY8bkj2lo00RrUghQi4";

    @Override
    public PaymentOrder createOrder(UserEntity user, Set<OrderEntity> orders) {
        Long amount = orders.stream().mapToLong(OrderEntity::getTotalSellingPrice).sum();

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setOrders(orders);
        return paymentOrderRepo.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long orderId) throws PaymentExceptions {
        return paymentOrderRepo.findById(orderId).orElseThrow( () -> new PaymentExceptions("Payment order is not found ..."));
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws PaymentExceptions {
        PaymentOrder paymentOrder = paymentOrderRepo.findByPaymentLinkId(paymentId);
        if (paymentOrder == null) {
            throw new PaymentExceptions("Payment order not found with payment link id :" + paymentId);
        }
        return paymentOrder;
    }

    @Override
    public Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException {
        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            RazorpayClient razorpay = new RazorpayClient(apiKey , apiSecret);

            Payment payment = razorpay.payments.fetch(paymentId);

            String status = payment.get("status");

            if (status.equals("captured")) {
                Set<OrderEntity> orders = paymentOrder.getOrders();
                for (OrderEntity order : orders) {
                    order.setPaymentStatus(PaymentStatus.COMPLETED);
                    orderRepo.save(order);
                }
                paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepo.save(paymentOrder);
                return true;
            }
            paymentOrder.setStatus(PaymentOrderStatus.FAILED);
            paymentOrderRepo.save(paymentOrder);
        }
        return false;
    }

    @Override
    public PaymentLink creteRazorpayPaymentLink(UserEntity user, Long amount, Long orderId) throws RazorpayException {
        amount = amount * 100;
        try {
            RazorpayClient razorpay = new RazorpayClient(apiKey , apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount);
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", user.getUsername());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            notify.put("type", "notify");

            paymentLinkRequest.put("callback_url", "https://localhost:3000/payment-success"+orderId);
            paymentLinkRequest.put("callback_method", "GET");

            PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkUrl = paymentLink.get("short_url");
            String paymentLinkId = paymentLink.get("id");

            return paymentLink;
        }
        catch (RazorpayException e) {
            System.out.println(e.getMessage());
            throw new RazorpayException(e.getMessage());
        }
    }

    @Override
    public String createStripePaymentLink(UserEntity user, Long amount, Long orderId) throws StripeException {
        Stripe.apiKey=stripeApiKey;
        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("https://localhost:3000/payment-success"+orderId)
                .setCancelUrl("https://localhost:3000/payment-cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount*100)
                                .setProductData(
                                        SessionCreateParams.LineItem.PriceData.ProductData
                                                .builder().setName("HikariHub")
                                                .build()
                                ).build()
                        ).build()
                ).build();

        Session session = Session.create(params);
        return session.getUrl();
    }
}
