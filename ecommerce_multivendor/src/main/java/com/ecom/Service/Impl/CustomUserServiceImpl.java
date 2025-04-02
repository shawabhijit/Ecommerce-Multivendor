package com.ecom.Service.Impl;

import com.ecom.Domain.UserRole;
import com.ecom.Entity.SellerEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Repository.SellerRepo;
import com.ecom.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserServiceImpl implements UserDetailsService {

    private final UserRepo userRepo;
    private final SellerRepo sellerRepo;
    private static final String SELLER_PREFIX="seller_";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.startsWith(SELLER_PREFIX)) {
            String actualUsername = username.substring(SELLER_PREFIX.length());
            SellerEntity seller = sellerRepo.findByEmail(actualUsername);

            if(seller != null) {
                return buildUserDetails(seller.getEmail(),seller.getPassword(),seller.getRole());
            }
        }
        else {
            UserEntity user = userRepo.findByEmail(username);
            if (user != null) {
                return buildUserDetails(user.getEmail(), user.getPassword(), user.getRole());
            }
        }
        throw new UsernameNotFoundException("User or seller not found with email : " + username);
    }

    private UserDetails buildUserDetails(String email, String password, UserRole role) {
        if (role == null) role=UserRole.ROLE_CUSTOMER;

        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("Role" +role));

        return new org.springframework.security.core.userdetails.User(email, password, authorityList);
    }
}
