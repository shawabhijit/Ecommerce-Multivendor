package com.ecom.Controller;

import com.ecom.Entity.ProductEntity;
import com.ecom.Entity.SellerEntity;
import com.ecom.Exceptions.ProductException;
import com.ecom.Exceptions.SellerException;
import com.ecom.Request.CreateProductRequest;
import com.ecom.Service.ProductService;
import com.ecom.Service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sellers/products")
public class SellerProductController {

    private final ProductService productService;
    private final SellerService sellerService;

    @GetMapping()
    public ResponseEntity<?> getProductsBySellerId(@CookieValue(name = "jwt" , required = false) String token) throws SellerException, ProductException {
//        System.out.println("token is not valid ");
        SellerEntity seller = sellerService.getSellerProfile(token);
        if (seller == null) {
            throw new SellerException("Invalid token");
        }
        List<ProductEntity> products = productService.getProductBySellerId(seller.getId());
        return ResponseEntity.ok().body(products);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct (
            @RequestBody CreateProductRequest createProductRequest,
            @CookieValue(name = "jwt" , required = false) String jwt
    ) throws ProductException, SellerException {

        SellerEntity seller = sellerService.getSellerProfile(jwt);

        ProductEntity product = productService.createProduct(createProductRequest, seller);

        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) throws ProductException {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok().build();
        }catch (ProductException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{ProductId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long ProductId, @RequestBody ProductEntity product) throws ProductException {
        try {
            ProductEntity updatedProduct = productService.updateProduct(ProductId, product);
            return ResponseEntity.ok().body(updatedProduct);
        }
        catch (ProductException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
