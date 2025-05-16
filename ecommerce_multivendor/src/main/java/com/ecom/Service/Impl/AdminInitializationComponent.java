package com.ecom.Service.Impl;

import com.ecom.Entity.AdminEntity;
import com.ecom.Entity.SiteDetails;
import com.ecom.Repository.AdminRepo;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Comment;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializationComponent implements CommandLineRunner {

    private final AdminRepo adminRepo;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void run(String... args) throws Exception {
        initializeAdmin();
    }

    private void initializeAdmin() throws Exception {
        String adminUsername = "hiakri861@gmail.com";

        if (adminRepo.findByEmail(adminUsername) == null) {
            AdminEntity admin = new AdminEntity();
            admin.setEmail(adminUsername);
            admin.setPassword(passwordEncoder.encode("hiakri@861"));
            admin.setName("Abhijit Sahoo");
            adminRepo.save(admin);
        }
    }
}
