package com.ecom.Controller;

import com.ecom.Domain.AccountStatus;
import com.ecom.Entity.AdminEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Repository.AdminRepo;
import com.ecom.Response.AdminResponse;
import com.ecom.Service.AuthService;
import com.ecom.Service.Impl.AuthServiceImpl;
import com.ecom.Service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {
    private final SellerService sellerService;
    private final AdminRepo adminRepo;
    private final PasswordEncoder passwordEncoder;

    @PatchMapping("/seller/{id}/status/{status}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @PathVariable AccountStatus status) throws Exception {
        SellerEntity updateSeller = sellerService.updateSellerAccountStatus(id,status);
        return ResponseEntity.ok().body(updateSeller);
    }

    @GetMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestParam String email, @RequestParam String password) throws Exception {
        AdminEntity admin = adminRepo.findByEmail(email);
        if (admin == null) {
            throw new Exception("Admin not found");
        }

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new Exception("Incorrect password");
        }

        return ResponseEntity.ok().body("Admin Logged in successfully");
    }
}
