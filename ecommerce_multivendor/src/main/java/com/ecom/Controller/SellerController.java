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
import com.ecom.Service.SellerReportService;
import com.ecom.Service.SellerService;
import com.ecom.Utils.OtpUtil;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
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
    private final SellerReportService sellerReportService;


    @PostMapping("/login")
    public ResponseEntity<?> loginSeller (@RequestBody LoginRequest request , HttpServletResponse res) throws Exception {

        String otp = request.getOtp();
        String email = request.getEmail();

        request.setEmail("seller_" + email);
        AuthResponse authResponse = authService.signing(request);

        ResponseCookie cookie = ResponseCookie.from("jwt", authResponse.getToken())
                .httpOnly(true)
                .secure(true) // ✅ true for production HTTPS
                .sameSite("None") // ✅ required for cross-site cookies
                .path("/")
                .maxAge(Duration.ofDays(2))
                .build();

        res.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());


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

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getSellerByEmail (@PathVariable String email) throws SellerException {
        SellerEntity seller = sellerService.getSellerByEmail(email);
        return ResponseEntity.ok().body(seller);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSeller (@RequestBody SellerEntity seller) throws SellerException , MessagingException {

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

    @GetMapping
    public ResponseEntity<?> getAllSellers (@RequestParam(required = false) String status) throws SellerException {
        if (status != null) {
            AccountStatus accountStatus = AccountStatus.valueOf(status);
            return ResponseEntity.ok().body(sellerService.getAllSellers(accountStatus));
        }
        return ResponseEntity.ok().body(sellerService.getAllSellers(null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSellerById (@PathVariable Long id) throws SellerException {
        SellerEntity seller = sellerService.getSellerById(id);
        return ResponseEntity.ok().body(seller);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getSellerByJwt (@CookieValue(name = "jwt" , required = false) String jwt) throws SellerException {
        if (jwt == null || jwt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token is missing");
        }
        SellerEntity seller = sellerService.getSellerProfile(jwt);
        return ResponseEntity.ok().body(seller);
    }

    @GetMapping("/report")
    public ResponseEntity<?> getSellerReport(@RequestHeader("Authorization") String jwt) throws SellerException {
        SellerEntity seller = sellerService.getSellerProfile(jwt);
        SellerReport report = sellerReportService.getSellerReport(seller);
        return ResponseEntity.ok().body(report);
    }

    @PatchMapping("/update")
    public ResponseEntity<?> updateSeller (@CookieValue(name = "jwt" , required = false) String jwt ,
                                           @RequestBody SellerEntity seller) throws SellerException {
        SellerEntity profile = sellerService.getSellerProfile(jwt);
        profile = sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok().body(profile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeller (@PathVariable Long id) throws SellerException {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }


}
