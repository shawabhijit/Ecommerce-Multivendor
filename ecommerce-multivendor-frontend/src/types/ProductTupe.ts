import { SellerSignupRequest } from "./SellerType";

export type Products = {
    id: number;
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    discountPrice?: number;
    quantity: number;
    images: string[];
    status: string;
    sku?: string | null;
    barcode?: string | null;
    tags: string[];
    numRatings: number;
    category: {
        name: string;
        categoryid?: string;
    };
    variants: {
        name: string;
        value: string;
    }[];
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string;
    };
    shipping?: {
        weight?: number;
        dimensions?: {
            length?: number;
            width?: number;
            height?: number;
        };
        freeShipping: boolean;
    };
    ratings?: {
        average: number;
        count: number;
    };
    reviews?: any[];
};

export type ProductsResponse = {
    content: Products[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageAble: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        unpaged: boolean;
    };
    size: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
};


interface Categories {
    name: string;
    categoryid: string;
    parentCategory: string;
    level: number;
}

interface variants {
    name: string;
    value: string;
}

interface SEO {
    metaTitle: string;
    metaDescription: string;
    keywords?: string | null;
}

interface Shipping {
    weight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    }
    freeShipping: boolean;
}

interface Ratings {
    average: number;
    count: number;
}