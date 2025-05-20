package com.ecom.Request;

import com.ecom.Domain.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginOtpRequest {
    private String email;
    private String otp;
    //private UserRole role;
}
