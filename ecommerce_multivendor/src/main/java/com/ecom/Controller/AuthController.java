package com.ecom.Controller;

import com.ecom.Domain.UserRole;
import com.ecom.Entity.UserEntity;
import com.ecom.Entity.VerificationCode;
import com.ecom.Request.LoginOtpRequest;
import com.ecom.Request.LoginRequest;
import com.ecom.Response.ApiResponse;
import com.ecom.Response.AuthResponse;
import com.ecom.Response.SignUpRequest;
import com.ecom.Service.AuthService;
import com.ecom.Service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> createUserHandler (@RequestBody SignUpRequest signUpRequest) throws Exception {

        String jwt = authService.CreateUser(signUpRequest);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwt);
        authResponse.setMessage("register success.");
        authResponse.setRole(UserRole.ROLE_CUSTOMER);

        return ResponseEntity.ok().body(authResponse);
    }

    @PostMapping("/signup/sent-otp")
    public ResponseEntity<?> sentOtpHandler (@RequestBody LoginOtpRequest req) throws Exception {

        System.out.println(req.getEmail());

        authService.sentLoginOtp(req.getEmail(),req.getRole());

        ApiResponse authResponse = new ApiResponse();
        authResponse.setMessage("Otp Sent Successfully.");


        return ResponseEntity.ok().body(authResponse);
    }

    @PostMapping("/signing")
    public ResponseEntity<?> loginHandler (@RequestBody LoginRequest req , HttpServletResponse response) throws Exception {

        System.out.println(req.getEmail());

        AuthResponse auth = authService.signing(req);

        Cookie cookie = new Cookie("jwt", auth.getToken());
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge((24 * 60 * 60)*2);   // 2 day

        response.addCookie(cookie);

        return ResponseEntity.ok().body(auth);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logouthandler (@CookieValue(name = "jwt" , required = false) String jwt , HttpServletResponse response) throws Exception {
        if (jwt != null) {
            Cookie cookie = new Cookie("jwt", null);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(0);

            response.addCookie(cookie);
        }

        return ResponseEntity.ok().body("Logged out successfully");
    }
}
