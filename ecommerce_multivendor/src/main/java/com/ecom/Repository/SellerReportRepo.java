package com.ecom.Repository;

import com.ecom.Entity.SellerReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerReportRepo extends JpaRepository<SellerReport, Long> {
    SellerReport findBySellerId(Long sellerId);
}
