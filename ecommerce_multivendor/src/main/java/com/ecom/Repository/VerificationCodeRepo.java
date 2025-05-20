package com.ecom.Repository;

import com.ecom.Entity.VerificationCode;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Registered
public interface VerificationCodeRepo extends JpaRepository<VerificationCode , Long> {

    List<VerificationCode> findAllByEmail(String email);
    VerificationCode findByOtp(String otp);

    @Query("SELECT v FROM VerificationCode v WHERE v.email = :email ORDER BY v.id DESC")
    List<VerificationCode> findLatestByEmail(@Param("email") String email);
}
