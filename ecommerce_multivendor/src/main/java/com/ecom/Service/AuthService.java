package com.ecom.Service;

import com.ecom.Entity.UserEntity;
import com.ecom.Request.LoginRequest;
import com.ecom.Response.AuthResponse;
import com.ecom.Response.SignUpRequest;

public interface AuthService {

    public String CreateUser(SignUpRequest signUpRequest) throws Exception;

    void sentLoginOtp(String email) throws Exception;

    AuthResponse signing(LoginRequest request);
}
