package com.ecom.Controller;

import com.ecom.Domain.AccountStatus;
import com.ecom.Entity.SellerEntity;
import com.ecom.Service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {
    private final SellerService sellerService;

    @PatchMapping("/seller/{id}/status/{status}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @PathVariable AccountStatus status) throws Exception {
        SellerEntity updateSeller = sellerService.updateSellerAccountStatus(id,status);
        return ResponseEntity.ok().body(updateSeller);
    }
}
