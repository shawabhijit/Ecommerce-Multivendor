package com.ecom.Service.Impl;

import com.ecom.Config.JwtProvider;
import com.ecom.Entity.UserEntity;
import com.ecom.Repository.UserRepo;
import com.ecom.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final JwtProvider jwtProvider;


    @Override
    public UserEntity findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        UserEntity user = this.findUserByEmail(email);
        if (user == null) {
            throw new Exception("User not found with email " + email);
        }
        return user;
    }

    @Override
    public UserEntity findUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

}
