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
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
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
    public ResponseEntity<?> sentOtpHandler(@RequestBody LoginOtpRequest req) {
        //log.info("Received OTP request for email: {} with role: {}", req.getEmail(), req.getRole());

        if (req.getEmail() == null || req.getEmail().isEmpty()) {
            log.warn("Invalid request: Email is empty");
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Email address is required"));
        }

        try {
            log.info("Calling authService.sentLoginOtp");
            authService.sentLoginOtp(req.getEmail());

            log.info("OTP sent successfully to {}", req.getEmail());
            ApiResponse authResponse = new ApiResponse();
            authResponse.setMessage("OTP sent successfully.");
            return ResponseEntity.ok().body(authResponse);

        } catch (Exception e) {
            log.error("Error sending OTP to {}: {}", req.getEmail(), e.getMessage());
            log.error("Exception details:", e);

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to send OTP");
            errorResponse.put("details", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }

    @PostMapping("/signing")
    public ResponseEntity<?> loginHandler (@RequestBody LoginRequest req , HttpServletResponse response) throws Exception {

        //System.out.println(req.getEmail());

        AuthResponse auth = authService.signing(req);

        ResponseCookie cookie = ResponseCookie.from("jwt", auth.getToken())
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(Duration.ofDays(2))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().body(auth);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logouthandler (@CookieValue(name = "jwt" , required = false) String jwt , HttpServletResponse response) throws Exception {
        if (jwt != null) {
            ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
                    .httpOnly(true)
                    .secure(true)
                    .sameSite("None")
                    .path("/")
                    .maxAge(0)
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }

        return ResponseEntity.ok().body("Logged out successfully");
    }
}
