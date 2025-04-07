package com.ecom.Service;

import com.ecom.Domain.AccountStatus;
import com.ecom.Entity.SellerEntity;
import com.ecom.Exceptions.SellerException;

import java.util.List;

public interface SellerService {

    SellerEntity getSellerProfile(String jwt) throws SellerException;
    SellerEntity createSeller(SellerEntity seller) throws SellerException;
    SellerEntity getSellerById(Long id) throws SellerException;
    SellerEntity getSellerByEmail(String email) throws SellerException;
    List<SellerEntity> getAllSellers(AccountStatus status);
    SellerEntity updateSeller(Long id ,SellerEntity seller) throws SellerException;
    void deleteSeller(Long id) throws SellerException;
    SellerEntity verifyEmail(String email , String otp) throws SellerException;

    SellerEntity updateSellerAccountStatus(Long id, AccountStatus status) throws SellerException;

}
