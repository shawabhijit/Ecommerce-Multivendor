
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


export const customers = [
    {
        id: "1",
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        joinedDate: new Date("2023-01-15"),
        status: "active",
        orders: 12,
        spent: 1234.56,
    },
    {
        id: "2",
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        joinedDate: new Date("2023-02-20"),
        status: "active",
        orders: 5,
        spent: 645.2,
    },
    {
        id: "3",
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        joinedDate: new Date("2023-03-05"),
        status: "inactive",
        orders: 2,
        spent: 189.99,
    },
    {
        id: "4",
        name: "William Chen",
        email: "william.chen@email.com",
        joinedDate: new Date("2023-03-10"),
        status: "active",
        orders: 8,
        spent: 876.3,
    },
    {
        id: "5",
        name: "Sophia Rodriguez",
        email: "sophia.rodriguez@email.com",
        joinedDate: new Date("2023-04-02"),
        status: "banned",
        orders: 0,
        spent: 0,
    },
    {
        id: "6",
        name: "Ethan Johnson",
        email: "ethan.johnson@email.com",
        joinedDate: new Date("2023-04-15"),
        status: "active",
        orders: 15,
        spent: 1567.89,
    },
    {
        id: "7",
        name: "Ava Williams",
        email: "ava.williams@email.com",
        joinedDate: new Date("2023-05-01"),
        status: "active",
        orders: 7,
        spent: 723.45,
    },
    {
        id: "8",
        name: "Noah Brown",
        email: "noah.brown@email.com",
        joinedDate: new Date("2023-05-12"),
        status: "inactive",
        orders: 3,
        spent: 245.67,
    },
  ]