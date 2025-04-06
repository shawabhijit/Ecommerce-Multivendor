package com.ecom.Service;

import com.ecom.Entity.DealEntity;

import java.util.List;

public interface DealService {
    List<DealEntity> getAllDeals();
    DealEntity createDeal(DealEntity deal);
    DealEntity updateDeal(DealEntity deal , Long id) throws Exception;
    void deleteDeal(Long id);
}
