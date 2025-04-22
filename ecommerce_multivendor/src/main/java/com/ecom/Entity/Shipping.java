package com.ecom.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shipping {
    private Double weight;
    private Dimensions dimensions;
    private boolean freeShipping;
}
