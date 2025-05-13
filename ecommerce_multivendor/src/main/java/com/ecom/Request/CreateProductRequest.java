package com.ecom.Request;

import com.ecom.Entity.CategoryEntity;
import com.ecom.Entity.SEO;
import com.ecom.Entity.Shipping;
import com.ecom.Entity.Variant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {
    private String title;
    private String description;
    private int mrpPrice;
    private int sellingPrice;
    private int discountPrice;
    private int quantity;
    private List<String> images;
    private String status;
    private String sku;
    private String barcode;
    private List<String> tags;
    private CategoryEntity category;
    private List<Variant> variants;
    private SEO seo;
    private Shipping shipping;
}
