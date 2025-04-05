package com.ecom.Service;

import com.ecom.Entity.SellerEntity;
import com.ecom.Entity.SellerReport;

public interface SellerReportService {

    SellerReport getSellerReport(SellerEntity seller);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
