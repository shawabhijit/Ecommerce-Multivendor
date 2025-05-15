
export const productStatus = [
    { id: "all", value: "All Status" },
    { id: "active", value: "Active" },
    { id: "inactive", value: "Inactive" },
    { id: "in_stock", value: "In Strock" },
    { id: "out_in_stock", value: "Out of stock" }
]
export const productCategories = [
    { id: "all", value: "All Categories" },
    { id: "electronics", value: "Electronics" },
    { id: "smart home", value: "Smart Home" },
    { id: "wearables", value: "Wearables" },
]

export const OrderStatus = [
    { id: "all", value: "All Status" },
    { id: "pending", value: "Pending" },
    { id: "processing", value: "Processing" },
    { id: "shipped", value: "Shipped" },
    { id: "delivered", value: "Delivered" },
    { id: "cancelled", value: "Cancelled" },
]

export const OrderDates = [
    { id: "all", value: "All Time" },
    { id: "today", value: "Today" },
    { id: "yesterday", value: "Yesterday" },
    { id: "last7days", value: "Last 7 Days" },
    { id: "last30days", value: "Last 30 Days" },
]



export const sellerData = {
    personal: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "/placeholder.svg",
        joinDate: "January 15, 2023",
    },
    business: {
        name: "Tech Gadgets Store",
        type: "LLC",
        gstin: "22AAAAA0000A1Z5",
        pan: "ABCDE1234F",
        description:
            "We sell high-quality tech gadgets and accessories at competitive prices. Our store features the latest smartphones, laptops, and smart home devices.",
        logo: "/placeholder.svg",
        banner: "/placeholder.svg?height=200&width=800",
        address: {
            street: "123 Commerce Street",
            city: "San Francisco",
            state: "CA",
            zipCode: "94103",
            country: "United States",
        },
    },
    bankDetails: {
        accountName: "John Doe",
        accountNumber: "XXXX-XXXX-XXXX-1234",
        bankName: "Chase Bank",
        ifscCode: "CHAS0123456",
        upiid: "johndoe@upi",
    },
    storeSettings: {
        storeUrl: "tech-gadgets-store",
        categories: ["Electronics", "Accessories", "Smart Home"],
        shippingMethods: ["Standard", "Express"],
        returnPolicy: "30-day return policy for all products in original condition.",
        isActive: true,
    },
    security: {
        twoFactorEnabled: false,
        lastPasswordChange: "3 months ago",
        loginAlerts: true,
    },
    notifications: {
        email: {
            orders: true,
            inventory: true,
            promotions: false,
            payouts: true,
        },
        push: {
            orders: true,
            inventory: false,
            promotions: false,
            payouts: true,
        },
    },
}