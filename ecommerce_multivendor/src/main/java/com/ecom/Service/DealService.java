package com.ecom.Service;

import com.ecom.Entity.DealEntity;
import com.ecom.Exceptions.DealExceptions;

import java.util.List;

public interface DealService {
    List<DealEntity> getAllDeals();
    DealEntity createDeal(DealEntity deal);
    DealEntity updateDeal(DealEntity deal , Long id) throws DealExceptions;
    void deleteDeal(Long id) throws DealExceptions;
}
