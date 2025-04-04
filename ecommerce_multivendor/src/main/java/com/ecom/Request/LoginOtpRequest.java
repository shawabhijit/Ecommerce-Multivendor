package com.ecom.Request;

import com.ecom.Domain.UserRole;
import lombok.Data;

@Data
public class LoginOtpRequest {
    private String email;
    private String otp;
    private UserRole role;
}
