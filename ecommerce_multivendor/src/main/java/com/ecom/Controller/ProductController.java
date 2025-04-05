package com.ecom.Controller;

import com.ecom.Entity.ProductEntity;
import com.ecom.Exceptions.ProductException;
import com.ecom.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) throws ProductException {
        ProductEntity product = productService.findProductById(productId);
        return ResponseEntity.ok().body(product);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProduct(@RequestParam(required = false) String query) throws ProductException {
        List<ProductEntity> products = productService.searchProducts(query);
        return ResponseEntity.ok().body(products);
    }

    public ResponseEntity<?> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String colors,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer minDiscount,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String stock,
            @RequestParam(required = false) Integer pageNumber
    ) throws ProductException {
        return ResponseEntity.ok()
                .body(productService.getAllProducts(
                        category,brand,colors,size,
                        minPrice,maxPrice,minDiscount,sort,stock,pageNumber));
    }
}
