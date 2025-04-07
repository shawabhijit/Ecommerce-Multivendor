package com.ecom.Service;

import com.ecom.Entity.UserEntity;
import com.ecom.Exceptions.UserExceptions;

public interface UserService {

    public UserEntity findUserByJwtToken(String jwt) throws UserExceptions;
    public UserEntity findUserByEmail(String email);
}
