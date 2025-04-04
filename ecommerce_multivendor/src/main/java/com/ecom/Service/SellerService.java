package com.ecom.Service;

import com.ecom.Domain.AccountStatus;
import com.ecom.Entity.SellerEntity;

import java.util.List;

public interface SellerService {

    SellerEntity getSellerProfile(String jwt) throws Exception;
    SellerEntity createSeller(SellerEntity seller) throws Exception;
    SellerEntity getSellerById(Long id) throws Exception;
    SellerEntity getSellerByEmail(String email) throws Exception;
    List<SellerEntity> getAllSellers(AccountStatus status);
    SellerEntity updateSeller(Long id ,SellerEntity seller) throws Exception;
    void deleteSeller(Long id) throws Exception;
    SellerEntity verifyEmail(String email , String otp) throws Exception;

    SellerEntity updateSellerAccountStatus(Long id, AccountStatus status) throws Exception;

}
