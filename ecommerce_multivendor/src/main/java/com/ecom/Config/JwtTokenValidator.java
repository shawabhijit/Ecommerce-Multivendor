package com.ecom.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

import static io.jsonwebtoken.Jwts.*;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String jwt = request.getHeader(JWT_CONSTANT.JWT_HEADER);
        if (jwt != null) {
            if (jwt.startsWith("Bearer ")) {
                jwt = jwt.substring(7);
            }
            //System.out.println("JWT HEADER: " + jwt);
            try {
                SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(JWT_CONSTANT.SECRET_KEY));
                //System.out.println("JWT KEY: " + key);

                // Updated JWT parsing code to use the newer API
                Claims claims = Jwts.parser()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                //System.out.println("JWT CLAIMS: " + claims);

                String email = String.valueOf(claims.get("email"));
                String authorities = claims.get("authrities").toString();

                List<GrantedAuthority> authorityList = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorityList);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            catch (Exception e) {
                System.out.println("JWT Error: " + e.getMessage());  // Add detailed logging
                throw new BadCredentialsException("Invalid JWT token...");
            }
        }

        filterChain.doFilter(request, response);
    }
}
