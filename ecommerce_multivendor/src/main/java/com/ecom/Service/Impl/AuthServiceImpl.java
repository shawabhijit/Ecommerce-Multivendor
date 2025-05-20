package com.ecom.Service.Impl;

import com.ecom.Config.JwtProvider;
import com.ecom.Domain.UserRole;
import com.ecom.Entity.CartEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Entity.VerificationCode;
import com.ecom.Repository.CartRepo;
import com.ecom.Repository.SellerRepo;
import com.ecom.Repository.UserRepo;
import com.ecom.Repository.VerificationCodeRepo;
import com.ecom.Request.LoginRequest;
import com.ecom.Response.AuthResponse;
import com.ecom.Response.SignUpRequest;
import com.ecom.Service.AuthService;
import com.ecom.Service.EmailService;
import com.ecom.Utils.OtpUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;
    private final CartRepo cartRepo;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepo verificationCodeRepo;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserService;
    private final SellerRepo sellerRepo;

    @Override
    public void sentLoginOtp(String email) throws Exception {
        String SIGNIN_PREFIX = "signing_";

        if(email.startsWith(SIGNIN_PREFIX)) {
            email = email.substring(SIGNIN_PREFIX.length());
        }

        log.info("Preparing to send OTP to email: {}", email);

        try {
            List<VerificationCode> existingCodes = verificationCodeRepo.findAllByEmail(email);

            if (existingCodes != null && !existingCodes.isEmpty()) {
                log.info("Found {} existing verification codes for email {}", existingCodes.size(), email);
                verificationCodeRepo.deleteAll(existingCodes);
            }

            String otp = OtpUtil.generateOtp();
            log.info("Generated new OTP for email: {}", email);

            VerificationCode code = new VerificationCode();
            code.setEmail(email);
            code.setOtp(otp);
            verificationCodeRepo.save(code);
            log.info("Verification code saved to database");

            String sub = "Login / Sign up OTP For Your HikariHub!";

            emailService.sendVerificationOtpEmail(email, otp, sub, null);
            log.info("OTP sent successfully via email service");
        } catch (Exception e) {
            log.error("Error in sentLoginOtp: {}", e.getMessage(), e);
            throw new Exception("Failed to send OTP: " + e.getMessage());
        }
    }

    @Override
    public AuthResponse signing(LoginRequest request) {
        String username = request.getEmail();
        String otp = request.getOtp();

        Authentication auth = authenticate(username, otp);
        SecurityContextHolder.getContext().setAuthentication(auth);

        String token = jwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(token);
        authResponse.setMessage("Login Successful");

        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

        String roleName = authorities.isEmpty() ? null: authorities.iterator().next().getAuthority();

        authResponse.setRole(UserRole.valueOf(roleName));
        return authResponse;
    }

    public Authentication authenticate(String username, String otp) {
        UserDetails userDetails = customUserService.loadUserByUsername(username);

        String SELLER_PREFIX = "seller_";

        if (username.startsWith(SELLER_PREFIX)) {
            username = username.substring(SELLER_PREFIX.length());
        }

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username.");
        }

        // Get the latest verification code for this email
        List<VerificationCode> codes = verificationCodeRepo.findAllByEmail(username);

        if (codes == null || codes.isEmpty()) {
            throw new BadCredentialsException("No verification code found.");
        }

        // Get the most recent code (assuming higher ID is more recent)
        VerificationCode latestCode = codes.stream()
                .max((c1, c2) -> Long.compare(c1.getId(), c2.getId()))
                .orElseThrow(() -> new BadCredentialsException("Verification code expired."));

        if (!latestCode.getOtp().equals(otp)) {
            throw new BadCredentialsException("Wrong OTP.");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Override
    public String CreateUser(SignUpRequest signUpRequest) throws Exception {
        // Get all verification codes for this email
        List<VerificationCode> verificationCodes = verificationCodeRepo.findAllByEmail(signUpRequest.getEmail());

        if (verificationCodes == null || verificationCodes.isEmpty()) {
            throw new Exception("No verification code found...");
        }

        // Get the most recent code
        VerificationCode latestCode = verificationCodes.stream()
                .max((c1, c2) -> Long.compare(c1.getId(), c2.getId()))
                .orElseThrow(() -> new Exception("Verification code expired."));

        if (!latestCode.getOtp().equals(signUpRequest.getOtp())) {
            throw new Exception("Wrong OTP...");
        }

        UserEntity user = userRepo.findByEmail(signUpRequest.getEmail());

        if (user == null) {
            user = objectMapper.convertValue(signUpRequest, UserEntity.class);
            user.setPassword(passwordEncoder.encode(signUpRequest.getOtp()));
            UserEntity savedUser = userRepo.save(user);

            CartEntity cart = new CartEntity();
            cart.setUser(savedUser);
            cartRepo.save(cart);
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(UserRole.ROLE_CUSTOMER.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }
}