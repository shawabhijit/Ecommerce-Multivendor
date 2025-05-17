package com.ecom.Service.Impl;

import com.ecom.Config.JwtProvider;
import com.ecom.Entity.AddressEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Exceptions.UserExceptions;
import com.ecom.Repository.AddressRepo;
import com.ecom.Repository.UserRepo;
import com.ecom.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final JwtProvider jwtProvider;
    private final AddressRepo addressRepo;


    @Override
    public List<UserEntity> findAll() {
        return userRepo.findAll();
    }

    @Override
    public UserEntity findUserByJwtToken(String jwt) throws UserExceptions {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        UserEntity user = this.findUserByEmail(email);
        if (user == null) {
            throw new UserExceptions("User not found with email " + email);
        }
        return user;
    }

    @Override
    public UserEntity findUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public UserEntity updateUser(UserEntity user, long id) throws Exception {
        UserEntity oldUser = userRepo.findById(id).orElseThrow(() -> new Exception("user not found."));

        oldUser.setEmail(user.getEmail());
        oldUser.setPassword(oldUser.getPassword());
        oldUser.setUsername(user.getUsername());
        oldUser.setPhone(user.getPhone());
        oldUser.setGender(user.getGender());
        oldUser.setDob(user.getDob());

        return userRepo.save(oldUser);
    }

    @Override
    public UserEntity updateUserAddress(AddressEntity address, long id) throws Exception {
        System.out.println("cheacking is deafult value "+address.getDefault());
        UserEntity oldUser = userRepo.findById(id).orElseThrow(() -> new Exception("user not found."));
        addressRepo.save(address);
        List<AddressEntity> addresses = oldUser.getAddresses();
        addresses.add(address);
        oldUser.setAddresses(addresses);
        return userRepo.save(oldUser);
    }

}
