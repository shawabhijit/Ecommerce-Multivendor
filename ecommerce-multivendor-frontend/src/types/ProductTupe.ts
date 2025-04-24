import { SellerSignupRequest } from "./SellerType";

export interface Products {
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    discountPrice: number;
    quantity: number;
    color: string;
    images: string[];
    status:string;
    sku:string;
    barcode:string;
    updateAt?: string;
    createdAt?: string;
    tags: string[];
    numRatings: number;
    category: Categories;
    sizes: string[];
    varianta: variants[];
    seo?: SEO;
    shipping?: Shipping;
    ratings?: Ratings;
}

interface Categories {
    name: string;
    categoryId: string;
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
    keywords?:string[];
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