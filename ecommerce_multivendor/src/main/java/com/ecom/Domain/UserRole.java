package com.ecom.Domain;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum UserRole {
    ROLE_ADMIN,
    ROLE_CUSTOMER,
    ROLE_SELLER;

    @JsonCreator
    public static UserRole from(String value) {
        if (value == null) return null;
        return UserRole.valueOf(value.replace("\"", "")); // Handle improperly quoted values
    }
}
