package com.ecom.Service.Impl;

import com.ecom.Domain.HomeCategorySection;
import com.ecom.Entity.DealEntity;
import com.ecom.Entity.HomeCategory;
import com.ecom.Entity.HomePage;
import com.ecom.Repository.DealRepo;
import com.ecom.Service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final DealRepo dealRepo;

    @Override
    public HomePage createHomePageData(List<HomeCategory> allCategories) {
        List<HomeCategory> gridCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.GRID)
                .toList();

        List<HomeCategory> shopCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES)
                .toList();

        List<HomeCategory> electricCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.ELECTRIC_CATEGORIES)
                .toList();

        List<HomeCategory> dealsCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                .toList();

        List<DealEntity> createDeals = new ArrayList<>();

        if (dealRepo.findAll().isEmpty()) {
            List<DealEntity> deals = allCategories.stream()
                    .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                    .map(category -> new DealEntity(null, 10, category))
                    .toList();
            createDeals = dealRepo.saveAll(deals);
        }
        else {
            createDeals = dealRepo.findAll();
        }

        HomePage homePage = new HomePage();
        homePage.setGrid(gridCategories);
        homePage.setShopByCategories(shopCategories);
        homePage.setElectricCategories(electricCategories);
        homePage.setDeals(createDeals);
        homePage.setDealsCategories(dealsCategories);
        return homePage;
    }
}
