package com.ecom.Repository;

import com.ecom.Entity.VerificationCode;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;

@Registered
public interface VerificationCodeRepo extends JpaRepository<VerificationCode , Long> {

    VerificationCode findByEmail(String email);
}
