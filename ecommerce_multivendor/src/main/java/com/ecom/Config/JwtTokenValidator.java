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
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = request.getHeader(JWT_CONSTANT.JWT_HEADER);
        if (jwt != null) {
            jwt=jwt.substring(7);
            try {
                SecretKey key = Keys.hmacShaKeyFor(JWT_CONSTANT.SECRET_KEY.getBytes());
                Claims claims = Jwts.parser().setSigningKey(key).build()
                        .parseClaimsJws(jwt).getBody();

                String email = String.valueOf(claims.get("email"));
                String authorities = claims.get("authorities").toString();

                List<GrantedAuthority> authorityList = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorityList);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            catch (Exception e) {
                throw new BadCredentialsException("Invalid JWT token...");
            }
        }

        filterChain.doFilter(request, response);
    }
}
