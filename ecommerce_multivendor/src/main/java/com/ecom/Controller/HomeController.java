package com.ecom.Controller;

import com.ecom.Config.JwtProvider;
import com.ecom.Entity.UserEntity;
import com.ecom.Repository.UserRepo;
import com.ecom.Service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
public class HomeController {

    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final UserRepo userRepo;

    public HomeController(JwtProvider jwtProvider, UserService userService, UserRepo userRepo) {
        this.jwtProvider = jwtProvider;
        this.userService = userService;
        this.userRepo = userRepo;
    }

    @GetMapping
    public String HomeController() {
        return "Hello World";
    }

//    @GetMapping("/me")
//    public ResponseEntity<?> getCurrentCustomer(HttpServletRequest request) {
//        try {
//            // Extract and validate JWT token from cookie
//            String token = extractJwtFromCookies(request);
//            if (token == null) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//            }
//
//            // Get the authenticated customer email from token
//            String email = jwtProvider.getEmailFromJwtToken(token);
//            if (email == null) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//            }
//
//            UserEntity customer = userRepo.findByEmail(email);
//            if (customer == null) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//            }
//
//            return ResponseEntity.ok(customer);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentCustomer(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        UserEntity customer = userRepo.findByEmail(email);

        System.out.println(customer);

        if (customer == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(customer);
    }


    private String extractJwtFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

}
