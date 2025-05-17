package com.ecom.Service;

import com.ecom.Entity.AddressEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Exceptions.UserExceptions;

import java.util.List;

public interface UserService {
    List<UserEntity> findAll();
    public UserEntity findUserByJwtToken(String jwt) throws UserExceptions;
    public UserEntity findUserByEmail(String email);
    public UserEntity updateUser(UserEntity user , long id) throws Exception;
    public UserEntity updateUserAddress (AddressEntity address, long id) throws Exception;
}
