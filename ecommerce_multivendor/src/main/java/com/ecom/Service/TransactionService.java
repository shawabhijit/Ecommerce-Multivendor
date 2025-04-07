package com.ecom.Service;

import com.ecom.Entity.OrderEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Entity.Transaction;
import com.ecom.Exceptions.SellerException;

import java.util.List;

public interface TransactionService  {

    Transaction createTransaction (OrderEntity order) throws SellerException;
    List<Transaction> getTransactionBySellerId (SellerEntity seller);
    List<Transaction> getAllTransaction();

}
