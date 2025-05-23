package com.ecom.Service.Impl;

import com.ecom.Config.JwtProvider;
import com.ecom.Domain.AccountStatus;
import com.ecom.Domain.UserRole;
import com.ecom.Entity.AddressEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Exceptions.SellerException;
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
    public SellerEntity getSellerProfile(String jwt) throws SellerException {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        if (email == null) {
            throw new SellerException("Invalid JWT token");
        }
        return this.getSellerByEmail(email);
    }

    @Override
    public SellerEntity createSeller(SellerEntity seller) throws SellerException {
        if (sellerRepo.findByEmail(seller.getEmail()) != null) {
            throw new SellerException("Email already in use , Provide some different email.");
        }
        AddressEntity address = addressRepo.save(seller.getPickupAddress());

        SellerEntity newSeller = new SellerEntity();
        newSeller.setEmail(seller.getEmail());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setFullName(seller.getFullName());
        newSeller.setPhone(seller.getPhone());
        newSeller.setPickupAddress(address);
        newSeller.setRole(UserRole.ROLE_SELLER);
        newSeller.setBankDetails(seller.getBankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails());

        return sellerRepo.save(newSeller);
    }

    @Override
    public SellerEntity getSellerById(Long id) throws SellerException {
        return sellerRepo.findById(id)
                .orElseThrow( () -> new SellerException("Seller not found with id " + id));
    }

    @Override
    public SellerEntity getSellerByEmail(String email) throws SellerException {
        SellerEntity seller = sellerRepo.findByEmail(email);
        if (seller == null) {
            throw new SellerException("Seller not found.");
        }
        return seller;
    }

    @Override
    public List<SellerEntity> getAllSellers(AccountStatus status) {
        if (status == null ) {
            return sellerRepo.findAll();
        }
        return sellerRepo.findByAccountStatus(status);
    }

    @Override
    public SellerEntity updateSeller(Long id, SellerEntity seller) throws SellerException {
        SellerEntity oldSeller = this.getSellerById(id);

        if (seller.getFullName() != null) {
            oldSeller.setFullName(seller.getFullName());
        }
        if (seller.getPhone() != null) {
            oldSeller.setPhone(seller.getPhone());
        }
        if (seller.getEmail() != null) {
            oldSeller.setEmail(seller.getEmail());
        }
        if (seller.getBusinessDetails() != null
                && seller.getBusinessDetails().getBusinessName() != null) {
            oldSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
        }
        if (seller.getBusinessDetails() != null
                && seller.getBusinessDetails().getLogo() != null) {
            oldSeller.getBusinessDetails().setLogo(seller.getBusinessDetails().getLogo());
        }
        if (seller.getBusinessDetails() != null
                && seller.getBusinessDetails().getBanner() != null) {
            oldSeller.getBusinessDetails().setBanner(seller.getBusinessDetails().getBanner());
        }
        if (seller.getBusinessDetails() != null && seller.getBusinessDetails().getAddress() != null) {
            oldSeller.getBusinessDetails().setAddress(seller.getBusinessDetails().getAddress());
        }
        if (seller.getBusinessDetails() != null && seller.getBusinessDetails().getBusinessEmail() != null) {
            oldSeller.getBusinessDetails().setBusinessEmail(seller.getBusinessDetails().getBusinessEmail());
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
                && seller.getPickupAddress().getPickupCity() != null
                && seller.getPickupAddress().getPickupState() != null
                && seller.getPickupAddress().getPickupAddress() != null
                && seller.getPickupAddress().getPickupPhone() != null
                && seller.getPickupAddress().getPinCode() != null
        ) {
            oldSeller.getPickupAddress().setPickupCity(seller.getPickupAddress().getPickupCity());
            oldSeller.getPickupAddress().setPickupState(seller.getPickupAddress().getPickupState());
            oldSeller.getPickupAddress().setPickupAddress(seller.getPickupAddress().getPickupAddress());
            oldSeller.getPickupAddress().setPickupPhone(seller.getPickupAddress().getPickupPhone());
            oldSeller.getPickupAddress().setPickupZipCode(seller.getPickupAddress().getPickupZipCode());
        }

        if (seller.getAvtar() != null) {
            oldSeller.setAvtar(seller.getAvtar());
        }

        return sellerRepo.save(oldSeller);
    }

    @Override
    public void deleteSeller(Long id) throws SellerException {
        SellerEntity seller = this.getSellerById(id);
        sellerRepo.delete(seller);
    }

    @Override
    public SellerEntity verifyEmail(String email, String otp) throws SellerException {
        SellerEntity seller = sellerRepo.findByEmail(email);
        seller.setEmailVerified(true);
        return sellerRepo.save(seller);
    }

    @Override
    public SellerEntity updateSellerAccountStatus(Long id, AccountStatus status) throws SellerException {
        SellerEntity seller = this.getSellerById(id);
        seller.setAccountStatus(status);
        return sellerRepo.save(seller);
    }
}
