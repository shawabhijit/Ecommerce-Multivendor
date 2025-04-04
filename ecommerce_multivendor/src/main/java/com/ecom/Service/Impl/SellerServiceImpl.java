package com.ecom.Service.Impl;

import com.ecom.Config.JwtProvider;
import com.ecom.Domain.AccountStatus;
import com.ecom.Domain.UserRole;
import com.ecom.Entity.AddressEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Repository.AddressRepo;
import com.ecom.Repository.SellerRepo;
import com.ecom.Service.SellerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final SellerRepo sellerRepo;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepo addressRepo;
    private final ObjectMapper objectMapper;


    @Override
    public SellerEntity getSellerProfile(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        if (email == null) {
            throw new Exception("Invalid JWT token");
        }
        return this.getSellerProfile(email);
    }

    @Override
    public SellerEntity createSeller(SellerEntity seller) throws Exception {
        if (sellerRepo.findByEmail(seller.getEmail()) != null) {
            throw new Exception("Email already in use , Provide some different email.");
        }
        AddressEntity address = addressRepo.save(seller.getPickupAddress());

        SellerEntity newSeller = new SellerEntity();
        newSeller.setEmail(seller.getEmail());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setPickupAddress(address);
        newSeller.setRole(UserRole.ROLE_SELLER);
        newSeller.setMobile(seller.getMobile());
        newSeller.setBankDetails(seller.getBankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails());

        return sellerRepo.save(newSeller);
    }

    @Override
    public SellerEntity getSellerById(Long id) throws Exception {
        return sellerRepo.findById(id)
                .orElseThrow( () -> new Exception("Seller not found with id " + id));
    }

    @Override
    public SellerEntity getSellerByEmail(String email) throws Exception {
        SellerEntity seller = sellerRepo.findByEmail(email);
        if (seller == null) {
            throw new Exception("Seller not found.");
        }
        return null;
    }

    @Override
    public List<SellerEntity> getAllSellers(AccountStatus status) {
        return sellerRepo.findByAccountStatus(status);
    }

    @Override
    public SellerEntity updateSeller(Long id, SellerEntity seller) throws Exception {
        SellerEntity oldSeller = this.getSellerById(id);

        if (seller.getSellerName() != null) {
            oldSeller.setSellerName(seller.getSellerName());
        }
        if (seller.getMobile() != null) {
            oldSeller.setMobile(seller.getMobile());
        }
        if (seller.getEmail() != null) {
            oldSeller.setEmail(seller.getEmail());
        }
        if (seller.getBusinessDetails() != null
                && seller.getBusinessDetails().getBusinessName() != null) {
            oldSeller.getBusinessDetails()
                    .setBusinessName(seller.getBusinessDetails().getBusinessName());
        }
        if (seller.getBankDetails() != null
                && seller.getBankDetails().getAccountHolderName() != null
                && seller.getBankDetails().getIfscCode() != null
                && seller.getBankDetails().getAccountNumber() != null
        ) {
            oldSeller.getBankDetails().setAccountHolderName(seller.getBankDetails().getAccountHolderName());
            oldSeller.getBankDetails().setAccountNumber(seller.getBankDetails().getAccountNumber());
            oldSeller.getBankDetails().setIfscCode(seller.getBankDetails().getIfscCode());
        }

        if (seller.getPickupAddress() != null
                && seller.getPickupAddress().getCity() != null
                && seller.getPickupAddress().getState() != null
                && seller.getPickupAddress().getAddress() != null
                && seller.getPickupAddress().getMobile() != null
                && seller.getPickupAddress().getPinCode() != null
        ) {
            oldSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
            oldSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
            oldSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
            oldSeller.getPickupAddress().setMobile(seller.getPickupAddress().getMobile());
            oldSeller.getPickupAddress().setPinCode(seller.getPickupAddress().getPinCode());
        }

        return sellerRepo.save(oldSeller);
    }

    @Override
    public void deleteSeller(Long id) throws Exception {
        SellerEntity seller = this.getSellerById(id);
        sellerRepo.delete(seller);
    }

    @Override
    public SellerEntity verifyEmail(String email, String otp) throws Exception {
        SellerEntity seller = sellerRepo.findByEmail(email);
        seller.setEmailVerified(true);
        return sellerRepo.save(seller);
    }

    @Override
    public SellerEntity updateSellerAccountStatus(Long id, AccountStatus status) throws Exception {
        SellerEntity seller = this.getSellerById(id);
        seller.setAccountStatus(status);
        return sellerRepo.save(seller);
    }
}
