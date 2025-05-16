package com.ecom.Repository;

import com.ecom.Entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<AdminEntity, Long> {
    AdminEntity findByEmail(String email) throws Exception;
}
