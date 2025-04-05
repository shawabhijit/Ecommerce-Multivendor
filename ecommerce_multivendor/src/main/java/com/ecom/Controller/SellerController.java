package com.ecom.Controller;

import com.ecom.Config.JwtProvider;
import com.ecom.Domain.AccountStatus;
import com.ecom.Entity.SellerEntity;
import com.ecom.Entity.SellerReport;
import com.ecom.Entity.VerificationCode;
import com.ecom.Exceptions.SellerException;
import com.ecom.Repository.VerificationCodeRepo;
import com.ecom.Request.LoginRequest;
import com.ecom.Response.ApiResponse;
import com.ecom.Response.AuthResponse;
import com.ecom.Service.AuthService;
import com.ecom.Service.EmailService;
import com.ecom.Service.SellerService;
import com.ecom.Utils.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {

    private final SellerService sellerService;
    private final VerificationCodeRepo verificationCodeRepo;
    private final AuthService authService;
    private final EmailService emailService;
    private final JwtProvider jwtProvider;


    @PostMapping("/login")
    public ResponseEntity<?> loginSeller (@RequestBody LoginRequest request) throws Exception {

        String otp = request.getOtp();
        String email = request.getEmail();

//        VerificationCode verificationCode = verificationCodeRepo.findByEmail(email);
//
//        if (verificationCode == null || !verificationCode.getOtp().equals(request.getOtp())) {
//            throw new Exception("wrong otp");
//        }
        request.setEmail("seller_" + email);
        AuthResponse authResponse = authService.signing(request);

        return ResponseEntity.ok().body(authResponse);

    }

// TODO : learn about @PatchMapping
    @PatchMapping("/verify/{otp}")
    public ResponseEntity<?> verifySellerEmail (@PathVariable String otp) throws Exception {
        VerificationCode verificationCode = verificationCodeRepo.findByOtp(otp);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("Wrong otp.");
        }

        SellerEntity seller = sellerService.verifyEmail(verificationCode.getEmail(),otp);
        return ResponseEntity.ok().body(seller);
    }

    @PostMapping
    public ResponseEntity<?> createSeller (@RequestBody SellerEntity seller) throws Exception {

        SellerEntity savedSeller = sellerService.createSeller(seller);

        String otp = OtpUtil.generateOtp();

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(seller.getEmail());
        verificationCode.setOtp(otp);
        verificationCodeRepo.save(verificationCode);

        String subject = "HikariHub Email Verification Code";
        String text = "Welcome to HikariHub , verify your account using this link";
        String frontend_url = "http://localhost:3000/verify-seller/";
        emailService.sendVerificationOtpEmail(seller.getEmail(), verificationCode.getOtp(),subject,text + frontend_url);

        return new ResponseEntity<>(savedSeller, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSellerById (@PathVariable Long id) throws SellerException {
        SellerEntity seller = sellerService.getSellerById(id);
        return ResponseEntity.ok().body(seller);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getSellerByJwt (@RequestHeader("Authorization") String jwt) throws Exception {
        SellerEntity seller = sellerService.getSellerProfile(jwt);
        return ResponseEntity.ok().body(seller);
    }

//    @GetMapping("/report")
//    public ResponseEntity<?> getSellerReport(@RequestHeader("Authorization") String jwt) throws Exception {
//          SellerEntity seller = sellerService.getSellerProfile(jwt);
//            SellerReport report = sellerReportService.getSellerReport(seller);
//            return ResponseEntity.ok().body(report);
//    }

    @GetMapping
    public ResponseEntity<?> getAllSellers(@RequestParam(required = false)AccountStatus status) throws Exception {
        List<SellerEntity> sellers = sellerService.getAllSellers(status);
        return ResponseEntity.ok().body(sellers);
    }

    @PatchMapping()
    public ResponseEntity<?> updateSeller (@RequestHeader("Authorization") String jwt ,
                                           @RequestBody SellerEntity seller) throws Exception {
        SellerEntity profile = sellerService.getSellerProfile(jwt);
        profile = sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok().body(profile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeller (@PathVariable Long id) throws Exception {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }


}
