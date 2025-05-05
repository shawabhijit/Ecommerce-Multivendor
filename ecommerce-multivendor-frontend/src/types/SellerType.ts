export interface SellerSignupRequest {
    fullName: string; //
    email: string; //
    phone: string; //
    password: string; //
    confirmPassword: string;  // dont need 
    businessDetails: {
        businessName: string; //
        businessEmail: string; //
        businessPhone: string; //
        address: string; //
        city: string; //
        state: string; //
        zipCode: string; //
        businessType: string; //
        gstin?: string | undefined; //
    },
    bankDetails: {
        accountNumber: string; //
        ifscCode: string; //
        accountHolderName: string; //
    }
    pickupAddress: {
        pickupBusinessName: string; //
        locality: string; //
        pickupPhone: string;
        pickupAddress: string; //
        pickupCity: string; //
        pickupState: string; //
        pickupZipCode: string; //
    }
}


export interface SellerReport {
    id: number;
    seller: SellerSignupRequest;
    totalEarnings: number;
    totalSales: number;
    totalRefunds: number;
    totalTax: number;
    totalProducts: number;
    totalOrders: number;
    totalCustomers: number;
    canceledOrders: number;
    totalTransactions: number;
}