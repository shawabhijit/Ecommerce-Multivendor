package com.ecom.Service.Impl;

import com.ecom.Entity.OrderEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Entity.Transaction;
import com.ecom.Repository.SellerRepo;
import com.ecom.Repository.TransactionRepo;
import com.ecom.Service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepo transactionRepo;
    private final SellerRepo sellerRepo;

    @Override
    public Transaction createTransaction(OrderEntity order) {
        SellerEntity seller = sellerRepo.findById(order.getSellerId()).orElseThrow( () -> new RuntimeException("Seller not found"));

        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(order.getUser());
        transaction.setOrder(order);
        return transactionRepo.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionBySellerId(SellerEntity seller) {
        return transactionRepo.findBySellerId(seller.getId());
    }

    @Override
    public List<Transaction> getAllTransaction() {
        return transactionRepo.findAll();
    }
}
