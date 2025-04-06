package com.ecom.Service.Impl;

import com.ecom.Entity.DealEntity;
import com.ecom.Entity.HomeCategory;
import com.ecom.Repository.DealRepo;
import com.ecom.Repository.HomeCategoryRepo;
import com.ecom.Service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {

    private final DealRepo dealRepo;
    private final HomeCategoryRepo homeCategoryRepo;

    @Override
    public List<DealEntity> getAllDeals() {
        return dealRepo.findAll();
    }

    @Override
    public DealEntity createDeal(DealEntity deal) {
        HomeCategory category = homeCategoryRepo.findById(deal.getCategory().getId()).orElseThrow(() -> new RuntimeException("Category not found"));

        DealEntity newDeal = new DealEntity();
        newDeal.setCategory(category);
        newDeal.setDiscount(deal.getDiscount());
        return dealRepo.save(newDeal);
    }

    @Override
    public DealEntity updateDeal(DealEntity deal , Long id) throws Exception {
        DealEntity exits = dealRepo.findById(id).orElse(null);
        HomeCategory category = homeCategoryRepo.findById(deal.getCategory().getId()).orElse(null);

        if (exits != null) {
            if (deal.getDiscount() != null) {
                exits.setDiscount(deal.getDiscount());
            }
            if (category != null) {
                exits.setCategory(category);
            }
            return dealRepo.save(exits);
        }
        throw new Exception("Deal not Found...");
    }

    @Override
    public void deleteDeal(Long dealId) {
        DealEntity newDeal = dealRepo.findById(dealId).orElseThrow(() -> new RuntimeException("Deal not found"));
        dealRepo.delete(newDeal);
    }
}
