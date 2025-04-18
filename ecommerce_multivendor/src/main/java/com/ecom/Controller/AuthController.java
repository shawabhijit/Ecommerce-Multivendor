package com.ecom.Controller;

import com.ecom.Domain.UserRole;
import com.ecom.Entity.VerificationCode;
import com.ecom.Request.LoginOtpRequest;
import com.ecom.Request.LoginRequest;
import com.ecom.Response.ApiResponse;
import com.ecom.Response.AuthResponse;
import com.ecom.Response.SignUpRequest;
import com.ecom.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> createUserHandler (@RequestBody SignUpRequest signUpRequest) throws Exception {

        String jwt = authService.CreateUser(signUpRequest);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwt);
        authResponse.setMessage("register success.");
        authResponse.setRole(UserRole.ROLE_CUSTOMER);

        return ResponseEntity.ok().body(authResponse);
    }

    @PostMapping("/signup/sent_otp")
    public ResponseEntity<?> sentOtpHandler (@RequestBody LoginOtpRequest req) throws Exception {

        authService.sentLoginOtp(req.getEmail(),req.getRole());

        ApiResponse authResponse = new ApiResponse();
        authResponse.setMessage("register success.");


        return ResponseEntity.ok().body(authResponse);
    }

    @PostMapping("/signing")
    public ResponseEntity<?> loginHandler (@RequestBody LoginRequest req) throws Exception {

        AuthResponse response = authService.signing(req);

        return ResponseEntity.ok().body(response);
    }



}
