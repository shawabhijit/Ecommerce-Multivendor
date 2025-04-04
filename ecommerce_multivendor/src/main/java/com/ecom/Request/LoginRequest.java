package com.ecom.Request;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String otp;
}
