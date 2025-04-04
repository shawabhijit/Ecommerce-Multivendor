package com.ecom.Service;

import com.ecom.Entity.UserEntity;

public interface UserService {

    public UserEntity findUserByJwtToken(String jwt) throws Exception;
    public UserEntity findUserByEmail(String email);
}
