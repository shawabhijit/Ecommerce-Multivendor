package com.ecom.Service;

import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Exceptions.ProductException;
import com.ecom.Request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    public ProductEntity createProduct(CreateProductRequest req , SellerEntity seller);
    public void deleteProduct(Long id) throws ProductException;
    public ProductEntity updateProduct(Long id, ProductEntity product) throws ProductException;
    public ProductEntity findProductById (Long id) throws ProductException;
    List<ProductEntity> searchProducts(String query);
    public Page<ProductEntity> getAllProducts (
            String category,
            String brand,
            String colors,
            String sizes,
            Integer minPrice,
            Integer maxPrice,
            Integer minDiscount,
            String sort,
            String stock,
            Integer pageNumber
    );

    public List<ProductEntity> getProductBySellerId (Long sellerId) throws ProductException;
}
