package com.ecom.Response;

import com.ecom.Entity.SiteDetails;
import lombok.Data;

@Data
public class AdminResponse {
    private String name;
    private String email;
    private SiteDetails siteDetails;
}
