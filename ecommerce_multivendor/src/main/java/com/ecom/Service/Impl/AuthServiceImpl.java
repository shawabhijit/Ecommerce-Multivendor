package com.ecom.Service.Impl;

import com.ecom.Config.JwtProvider;
import com.ecom.Domain.UserRole;
import com.ecom.Entity.CartEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Repository.CartRepo;
import com.ecom.Repository.UserRepo;
import com.ecom.Response.SignUpRequest;
import com.ecom.Service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;
    private final CartRepo cartRepo;
    private final JwtProvider jwtProvider;

    @Override
    public String CreateUser(SignUpRequest signUpRequest) {

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
