package com.ecom.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;

@Service
public class JwtProvider {

    SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(JWT_CONSTANT.SECRET_KEY));

    public String generateToken(Authentication authentication) {
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roles = populateAuthorities(authorities);

        return Jwts.builder()
                .header().empty().add("typ", "JWT")
                .and()
                .issuedAt(new Date())
                .expiration(new Date( new Date().getTime()+86400000))
                .claim("email", authentication.getName())
                .claim("authrities", roles)
                .signWith(key)
                .compact();
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auths = new HashSet<>();

        for (GrantedAuthority authority : authorities) {
            auths.add(authority.getAuthority());
        }
        return String.join(",", auths);
    }

    public String getEmailFromJwtToken (String jwt) {
        jwt=jwt.substring(7);
        Claims claims = Jwts.parser().setSigningKey(key).build()
                .parseClaimsJws(jwt).getBody();

        return String.valueOf(claims.get("email"));
    }
}
