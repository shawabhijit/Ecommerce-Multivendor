package com.ecom.Service;

import com.ecom.Entity.UserEntity;
import com.ecom.Response.SignUpRequest;

public interface AuthService {

    public String CreateUser(SignUpRequest signUpRequest);

}
