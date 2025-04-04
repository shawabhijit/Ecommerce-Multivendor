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
import lombok.RequiredArgsConstructor;
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
    public void sentLoginOtp(String email , UserRole role ) throws Exception {
        String SIGNIN_PREFIX = "signing_";
        //String SELLER_PREFIX = "seller_";

        if(email.startsWith(SIGNIN_PREFIX)) {
            email = email.substring(SIGNIN_PREFIX.length());

            if (role.equals(UserRole.ROLE_SELLER)) {
                SellerEntity seller = sellerRepo.findByEmail(email);
                if (seller == null) {
                    throw new Exception("SELLER not found.");
                }
            }
            else {
                UserEntity user = userRepo.findByEmail(email);
                if (user == null) {
                    throw new Exception("User not exits with provided email.");
                }
            }

        }

        VerificationCode isExits = verificationCodeRepo.findByEmail(email);
        if (isExits != null) {
            verificationCodeRepo.delete(isExits);
        }

        String otp = OtpUtil.generateOtp();

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setOtp(otp);
        verificationCodeRepo.save(verificationCode);

        String sub = "Login / Sign up OTP For Your HikariHub! ";
        String text = "We’re excited to welcome you back! To ensure a safe login, use the following OTP:" + otp;

        //System.out.println(email);

        emailService.sendVerificationOtpEmail(email,otp,sub,text);
    }

    @Override
    public AuthResponse signing(LoginRequest request) {
        String username = request.getEmail();
        String otp = request.getOtp();

        Authentication auth = authenticate(username,otp);
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

    private Authentication authenticate(String username, String otp) {
        UserDetails userDetails = customUserService.loadUserByUsername(username);

        String SELLER_PREFIX = "seller_";

        if (username.startsWith(SELLER_PREFIX)) {
            username = username.substring(SELLER_PREFIX.length());
        }

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username.");
        }

        VerificationCode verificationCode = verificationCodeRepo.findByEmail(username);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new BadCredentialsException("Wrong OTP.");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Override
    public String CreateUser(SignUpRequest signUpRequest) throws Exception {

        VerificationCode verificationCode = verificationCodeRepo.findByEmail(signUpRequest.getEmail());

        if (verificationCode == null || !verificationCode.getOtp().equals(signUpRequest.getOtp())) {
            throw new Exception("Wrong Otp...");
        }

        UserEntity user = userRepo.findByEmail(signUpRequest.getEmail());

        if (user == null) {
            user = objectMapper.convertValue(signUpRequest, UserEntity.class);
            user.setPassword(passwordEncoder.encode(signUpRequest.getOtp()));
            UserEntity savedUser =  userRepo.save(user);

            CartEntity cart = new CartEntity();
            cart.setUser(savedUser);
            cartRepo.save(cart);
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(UserRole.ROLE_CUSTOMER.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), null,authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }


}
