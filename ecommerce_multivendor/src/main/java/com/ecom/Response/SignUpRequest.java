package com.ecom.Response;

import lombok.Data;

@Data
public class SignUpRequest {

    private String email;
    private String username;
    private String otp;

}
