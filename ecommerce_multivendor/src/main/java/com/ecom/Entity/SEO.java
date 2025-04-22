package com.ecom.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SEO {
    private String metaTitle;
    private String metaDescription;
    private String keywords;
}
