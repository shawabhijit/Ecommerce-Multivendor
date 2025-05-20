package com.ecom.Service.Impl;

import com.ecom.Config.JwtProvider;
import com.ecom.Domain.UserRole;
import com.ecom.Entity.CartEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Entity.UserEntity;
import com.ecom.Entity.VerificationCode;
import com.ecom.Repository.CartRepo;
import com.ecom.Repository.SellerRepo;
import com.ecom.Repository.UserRepo;
import com.ecom.Repository.VerificationCodeRepo;
import com.ecom.Request.LoginRequest;
import com.ecom.Response.AuthResponse;
import com.ecom.Response.SignUpRequest;
import com.ecom.Service.AuthService;
import com.ecom.Service.EmailService;
import com.ecom.Utils.OtpUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;
    private final CartRepo cartRepo;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepo verificationCodeRepo;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserService;
    private final SellerRepo sellerRepo;

    @Override
    public void sentLoginOtp(String email, UserRole role) throws Exception {
        log.info("Starting sentLoginOtp process for email: {} with role: {}", email, role);

        try {
            String normalizedEmail = email;
            String SIGNIN_PREFIX = "signing_";

            // Handle prefix if present
            if (email != null && email.startsWith(SIGNIN_PREFIX)) {
                log.debug("Email has signin prefix, removing prefix");
                normalizedEmail = email.substring(SIGNIN_PREFIX.length());
                log.debug("Normalized email: {}", normalizedEmail);
            }

            // Validate if user exists based on role
            log.debug("Validating user existence for email: {} with role: {}", normalizedEmail, role);

            // Only validate existence if role is explicitly provided
            if (role != null) {
                if (role.equals(UserRole.ROLE_SELLER)) {
                    log.debug("Checking seller existence");
                    var seller = sellerRepo.findByEmail(normalizedEmail);
                    if (seller == null) {
                        log.warn("Seller not found with email: {}", normalizedEmail);
                        throw new Exception("Seller not found with email: " + normalizedEmail);
                    }
                    log.debug("Seller found: {}", seller.getEmail());
                } else {
                    log.debug("Checking user existence");
                    var user = userRepo.findByEmail(normalizedEmail);
                    if (user == null) {
                        log.warn("User not found with email: {}", normalizedEmail);
                        throw new Exception("User not found with email: " + normalizedEmail);
                    }
                    log.debug("User found: {}", user.getEmail());
                }
            }

            // Clean up existing verification codes
            log.debug("Cleaning up existing verification codes for: {}", normalizedEmail);
            try {
                VerificationCode isExits = verificationCodeRepo.findByEmail(normalizedEmail);
                if (isExits != null) {
                    verificationCodeRepo.delete(isExits);
                    log.debug("Deleted existing verification code");
                }
            } catch (Exception e) {
                log.warn("Error cleaning up existing verification codes: {}", e.getMessage());
                // Continue processing despite this error
            }

            // Generate and save new OTP
            log.debug("Generating OTP");
            String otp = OtpUtil.generateOtp();
            log.debug("OTP generated (not logged for security)");

            VerificationCode code = new VerificationCode();
            code.setEmail(normalizedEmail);
            code.setOtp(otp);

            try {
                log.debug("Saving verification code to database");
                verificationCodeRepo.save(code);
                log.debug("Verification code saved successfully");
            } catch (Exception e) {
                log.error("Failed to save verification code: {}", e.getMessage());
                throw new Exception("Failed to save verification code: " + e.getMessage());
            }

            // Prepare email content
            String sub = "Login / Sign up OTP For Your HikariHub!";
            String htmlContent = generateHtmlEmailContent(otp);

            // Send email
            log.info("Sending verification email to: {}", normalizedEmail);
            emailService.sendVerificationOtpEmail(normalizedEmail, otp, sub, htmlContent);
            log.info("OTP email sent successfully");

        } catch (Exception e) {
            log.error("Error in sentLoginOtp: {}", e.getMessage(), e);
            throw new Exception("Failed to send OTP: " + e.getMessage());
        }
    }

    @Override
    public AuthResponse signing(LoginRequest request) {
        String username = request.getEmail();
        String otp = request.getOtp();

        Authentication auth = authenticate(username,otp);
        SecurityContextHolder.getContext().setAuthentication(auth);

        String token = jwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(token);
        authResponse.setMessage("Login Successful");

        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

        String roleName = authorities.isEmpty() ? null: authorities.iterator().next().getAuthority();

        authResponse.setRole(UserRole.valueOf(roleName));
        return authResponse;
    }

    public Authentication authenticate(String username, String otp) {
        UserDetails userDetails = customUserService.loadUserByUsername(username);

        String SELLER_PREFIX = "seller_";

        if (username.startsWith(SELLER_PREFIX)) {
            username = username.substring(SELLER_PREFIX.length());
        }

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username.");
        }

        VerificationCode verificationCode = verificationCodeRepo.findByEmail(username);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new BadCredentialsException("Wrong OTP.");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Override
    public String CreateUser(SignUpRequest signUpRequest) throws Exception {

        VerificationCode verificationCode = verificationCodeRepo.findByEmail(signUpRequest.getEmail());

        if (verificationCode == null || !verificationCode.getOtp().equals(signUpRequest.getOtp())) {
            throw new Exception("Wrong Otp...");
        }

        UserEntity user = userRepo.findByEmail(signUpRequest.getEmail());

        if (user == null) {
            user = objectMapper.convertValue(signUpRequest, UserEntity.class);
            user.setPassword(passwordEncoder.encode(signUpRequest.getOtp()));
            UserEntity savedUser =  userRepo.save(user);

            CartEntity cart = new CartEntity();
            cart.setUser(savedUser);
            cartRepo.save(cart);
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(UserRole.ROLE_CUSTOMER.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), null,authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    private String generateHtmlEmailContent(String otp) {
        return """
                <!DOCTYPE html>
                <html lang="en" style="font-family: 'Segoe UI', sans-serif;">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>OTP Verification</title>
                </head>
                <body style="background-color:#f4f4f4; padding: 0; margin: 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center" style="padding: 40px 0;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
                                    <tr style="background-color: #2b2e4a;">
                                        <td style="padding: 30px; text-align: center; color: #ffffff;">
                                            <h1 style="margin: 0; font-size: 24px;">HikariHub</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 30px; color: #333333;">
                                            <h2 style="margin-top: 0;">Your One-Time Password (OTP)</h2>
                                            <p style="font-size: 16px;">Hello,</p>
                                            <p style="font-size: 16px;">
                                                We're excited to welcome you back! Please use the OTP below to complete your login:
                                            </p>
                                            <p style="font-size: 32px; font-weight: bold; color: #2b2e4a; text-align: center; margin: 30px 0;">
                                                %s
                                            </p>
                                            <p style="font-size: 14px; color: #777;">
                                                This OTP is valid for 10 minutes. Do not share it with anyone for security reasons.
                                            </p>
                                            <p style="font-size: 16px;">Thanks,<br><strong>Team HikariHub</strong></p>
                                        </td>
                                    </tr>
                                    <tr style="background-color: #f4f4f4; text-align: center;">
                                        <td style="padding: 20px; font-size: 12px; color: #888;">
                                            If you didn't request this, please ignore this email.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
                """.formatted(otp);
    }
}