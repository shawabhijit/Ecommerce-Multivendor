package com.ecom.Service.Impl;

import com.ecom.Entity.SellerEntity;
import com.ecom.Entity.SellerReport;
import com.ecom.Repository.SellerReportRepo;
import com.ecom.Service.SellerReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerReportServiceImpl implements SellerReportService {

    private final SellerReportRepo sellerReportRepo;


    @Override
    public SellerReport getSellerReport(SellerEntity seller) {
        SellerReport sellerReport = sellerReportRepo.findBySellerId(seller.getId());

        if (sellerReport == null) {
            sellerReport = new SellerReport();
            sellerReport.setSeller(seller);
            return sellerReportRepo.save(sellerReport);
        }
        return sellerReport;
    }

    @Override
    public SellerReport updateSellerReport(SellerReport sellerReport) {
        return sellerReportRepo.save(sellerReport);
    }
}
