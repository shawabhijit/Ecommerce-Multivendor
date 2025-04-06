package com.ecom.Controller;

import com.ecom.Entity.SellerEntity;
import com.ecom.Entity.Transaction;
import com.ecom.Exceptions.SellerException;
import com.ecom.Service.SellerService;
import com.ecom.Service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final SellerService sellerService;

    @GetMapping("/seller")
    public ResponseEntity<?> getTransactionBySellerId(@RequestHeader("Authorization") String jwt) throws SellerException {
        SellerEntity seller = sellerService.getSellerProfile(jwt);

        List<Transaction> transactions = transactionService.getTransactionBySellerId(seller);
        return ResponseEntity.ok().body(transactions);
    }

    @GetMapping
    public ResponseEntity<?> getAllTransaction() throws SellerException {
        List<Transaction> transactions = transactionService.getAllTransaction();
        return ResponseEntity.ok().body(transactions);
    }
}
