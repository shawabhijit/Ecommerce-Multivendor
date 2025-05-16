package com.ecom.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SiteDetails {
    private String siteName;
    private String siteEmail;
    private String siteLogo;
}
