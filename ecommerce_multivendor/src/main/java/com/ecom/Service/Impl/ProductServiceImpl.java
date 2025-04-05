package com.ecom.Service.Impl;

import com.ecom.Entity.CategoryEntity;
import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Exceptions.ProductException;
import com.ecom.Repository.CategoryRepo;
import com.ecom.Repository.ProductRepo;
import com.ecom.Request.CreateProductRequest;
import com.ecom.Service.ProductService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;

    @Override
    public ProductEntity createProduct(CreateProductRequest req, SellerEntity seller) {

        CategoryEntity category1 = categoryRepo.findByCategoryId(req.getCategory());

        if (category1 == null) {
            CategoryEntity category = new CategoryEntity();
            category.setCategoryId(req.getCategory());
            category.setLevel(1);
            category1 = categoryRepo.save(category);
        }

        CategoryEntity category2 = categoryRepo.findByCategoryId(req.getCategory2());

        if (category2 == null) {
            CategoryEntity category = new CategoryEntity();
            category.setCategoryId(req.getCategory2());
            category.setLevel(2);
            category.setParentCategory(category1);
            category2 = categoryRepo.save(category);
        }

        CategoryEntity category3 = categoryRepo.findByCategoryId(req.getCategory3());

        if (category3 == null) {
            CategoryEntity category = new CategoryEntity();
            category.setCategoryId(req.getCategory3());
            category.setLevel(3);
            category.setParentCategory(category2);
            category3 = categoryRepo.save(category);
        }

        int discountPercentage = calculateDiscountPercentage(req.getMrpPrice(), req.getSellingPrice());

        ProductEntity product = new ProductEntity();
        product.setSeller(seller);
        product.setCategory(category3);
        product.setDescription(req.getDescription());
        product.setCreatedAt(LocalDateTime.now());
        product.setTitle(req.getTitle());
        product.setColor(req.getColor());
        product.setSellingPrice(req.getSellingPrice());
        product.setMrpPrice(req.getMrpPrice());
        product.setImages(req.getImages());
        product.setSizes(req.getSizes());
        product.setDiscountPrice(discountPercentage);


        return productRepo.save(product);
    }

    @Override
    public void deleteProduct(Long id) throws ProductException {
        ProductEntity product = this.findProductById(id);
        productRepo.delete(product);
    }

    @Override
    public ProductEntity updateProduct(Long id, ProductEntity product) throws ProductException {
        ProductEntity oldProduct = this.findProductById(id);
        oldProduct.setDescription(product.getDescription());
        oldProduct.setTitle(product.getTitle());
        oldProduct.setColor(product.getColor());
        oldProduct.setSellingPrice(product.getSellingPrice());
        oldProduct.setMrpPrice(product.getMrpPrice());
        oldProduct.setImages(product.getImages());
        oldProduct.setSizes(product.getSizes());
        oldProduct.setDiscountPrice(product.getDiscountPrice());

        return productRepo.save(oldProduct);
    }

    @Override
    public ProductEntity findProductById(Long id) throws ProductException {
        return productRepo.findById(id)
                .orElseThrow(() -> new ProductException("Product not found by this id :"+ id));
    }

    @Override
    public List<ProductEntity> searchProducts(String query) {

        return productRepo.searchProduct(query);
    }

    @Override
    public Page<ProductEntity> getAllProducts(String category, String brand, String colors, String sizes, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber) {
        // TODO : Specification
        Specification<ProductEntity> spec = (root , query , criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (category != null) {
                Join<ProductEntity, CategoryEntity> categoryEntityJoin = root.join("category");
                predicates.add(criteriaBuilder.equal(categoryEntityJoin.get("categoryId"), category));
            }

            if (colors != null && !colors.isEmpty()) {
                //System.out.println("Colors :" + colors);
                predicates.add(criteriaBuilder.equal(root.get("color"), colors));
            }
            // filter by size (single value )
            if (sizes != null && !sizes.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("size"), sizes));
            }

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sellingPrice"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sellingPrice"), maxPrice));
            }

            if (minDiscount != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("discountPrice"), minDiscount));
            }

            if(stock != null && !stock.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        Pageable pageable;
        if (sort != null && !sort.isEmpty()) {
            pageable = switch (sort) {
                case "price_low" -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10,
                        Sort.by("sellingPrice").ascending());
                case "price_high" -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10,
                        Sort.by("sellingPrice").descending());
                default -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10,
                        Sort.unsorted());
            };
        }
        else {
            pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10
                                            ,Sort.unsorted());

        }
        return productRepo.findAll(spec , pageable);
    }

    @Override
    public List<ProductEntity> getProductBySellerId(Long sellerId) throws ProductException {
        List<ProductEntity> products = productRepo.findBySellerId(sellerId);
        if (products.isEmpty()) {
            throw new ProductException("No products found with this seller id :"+ sellerId);
        }
        return products;
    }

    private int calculateDiscountPercentage(double mrpPrice , double sellingPrice) {
        if (mrpPrice <= 0) {
            throw new IllegalArgumentException("MrpPrice must be greater than 0");
        }
        double discount = mrpPrice-sellingPrice;
        double discountPercentage = (discount/mrpPrice)*100;
        return (int) discountPercentage;
    }

}
