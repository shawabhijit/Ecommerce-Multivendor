import { DollarSign, Package, ShoppingCart, Users } from "lucide-react"

export const mockOrders = [
    {
        id: "ORD-001",
        customer: {
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "/placeholder.svg",
        },
        date: "2023-04-15T10:30:00",
        total: 129.99,
        status: "delivered",
        paymentStatus: "paid",
        items: [
            {
                id: "PROD-001",
                name: "Premium Wireless Headphones",
                price: 129.99,
                quantity: 1,
                image: "/placeholder.svg",
            },
        ],
        shippingAddress: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
        },
    },
    {
        id: "ORD-002",
        customer: {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            avatar: "/placeholder.svg",
        },
        date: "2023-04-14T14:45:00",
        total: 89.98,
        status: "shipped",
        paymentStatus: "paid",
        items: [
            {
                id: "PROD-002",
                name: "Ergonomic Mechanical Keyboard",
                price: 89.99,
                quantity: 1,
                image: "/placeholder.svg",
            },
        ],
        shippingAddress: {
            street: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            zip: "90001",
            country: "USA",
        },
    },
    {
        id: "ORD-003",
        customer: {
            name: "Robert Johnson",
            email: "robert.johnson@example.com",
            avatar: "/placeholder.svg",
        },
        date: "2023-04-14T09:15:00",
        total: 69.99,
        status: "processing",
        paymentStatus: "paid",
        items: [
            {
                id: "PROD-003",
                name: "Ultra HD Webcam",
                price: 69.99,
                quantity: 1,
                image: "/placeholder.svg",
            },
        ],
        shippingAddress: {
            street: "789 Pine St",
            city: "Chicago",
            state: "IL",
            zip: "60007",
            country: "USA",
        },
    },
    {
        id: "ORD-004",
        customer: {
            name: "Emily Davis",
            email: "emily.davis@example.com",
            avatar: "/placeholder.svg",
        },
        date: "2023-04-13T16:20:00",
        total: 49.99,
        status: "cancelled",
        paymentStatus: "refunded",
        items: [
            {
                id: "PROD-004",
                name: "Portable Bluetooth Speaker",
                price: 49.99,
                quantity: 1,
                image: "/placeholder.svg",
            },
        ],
        shippingAddress: {
            street: "321 Elm St",
            city: "Houston",
            state: "TX",
            zip: "77001",
            country: "USA",
        },
    },
    {
        id: "ORD-005",
        customer: {
            name: "Michael Wilson",
            email: "michael.wilson@example.com",
            avatar: "/placeholder.svg",
        },
        date: "2023-04-13T11:05:00",
        total: 29.99,
        status: "pending",
        paymentStatus: "pending",
        items: [
            {
                id: "PROD-005",
                name: "Wireless Charging Pad",
                price: 29.99,
                quantity: 1,
                image: "/placeholder.svg",
            },
        ],
        shippingAddress: {
            street: "654 Maple Ave",
            city: "Miami",
            state: "FL",
            zip: "33101",
            country: "USA",
        },
    },
    {
        id: "ORD-006",
        customer: {
            name: "Sarah Brown",
            email: "sarah.brown@example.com",
            avatar: "/placeholder.svg",
        },
        date: "2023-04-12T13:40:00",
        total: 39.98,
        status: "delivered",
        paymentStatus: "paid",
        items: [
            {
                id: "PROD-006",
                name: "USB-C to HDMI Adapter",
                price: 19.99,
                quantity: 2,
                image: "/placeholder.svg",
            },
        ],
        shippingAddress: {
            street: "987 Cedar St",
            city: "Seattle",
            state: "WA",
            zip: "98101",
            country: "USA",
        },
    },
    {
        id: "ORD-007",
        customer: {
            name: "David Miller",
            email: "david.miller@example.com",
            avatar: "/placeholder.svg",
        },
        date: "2023-04-12T09:30:00",
        total: 149.99,
        status: "shipped",
        paymentStatus: "paid",
        items: [
            {
                id: "PROD-007",
                name: "Smart Home Hub",
                price: 149.99,
                quantity: 1,
                image: "/placeholder.svg",
            },
        ],
        shippingAddress: {
            street: "753 Birch Ave",
            city: "Boston",
            state: "MA",
            zip: "02108",
            country: "USA",
        },
    },
]


// Mock data for the dashboard
export const stats = [
    {
        title: "Total Sales",
        value: "$12,345",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
        color: "bg-green-100 text-green-700",
    },
    {
        title: "Orders",
        value: "156",
        change: "+8.2%",
        trend: "up",
        icon: ShoppingCart,
        color: "bg-blue-100 text-blue-700",
    },
    {
        title: "Products",
        value: "48",
        change: "+4",
        trend: "up",
        icon: Package,
        color: "bg-purple-100 text-purple-700",
    },
    {
        title: "Customers",
        value: "1,245",
        change: "+18.3%",
        trend: "up",
        icon: Users,
        color: "bg-amber-100 text-amber-700",
    },
]

export const recentOrders = [
    {
        id: "ORD-001",
        customer: "John Doe",
        product: "Premium Headphones",
        amount: "$129.99",
        status: "Delivered",
        date: "2 hours ago",
        avatar: "/placeholder.svg",
    },
    {
        id: "ORD-002",
        customer: "Jane Smith",
        product: "Wireless Keyboard",
        amount: "$59.99",
        status: "Processing",
        date: "5 hours ago",
        avatar: "/placeholder.svg",
    },
    {
        id: "ORD-003",
        customer: "Robert Johnson",
        product: "Smart Watch",
        amount: "$199.99",
        status: "Shipped",
        date: "Yesterday",
        avatar: "/placeholder.svg",
    },
    {
        id: "ORD-004",
        customer: "Emily Davis",
        product: "Bluetooth Speaker",
        amount: "$79.99",
        status: "Cancelled",
        date: "Yesterday",
        avatar: "/placeholder.svg",
    },
    {
        id: "ORD-005",
        customer: "Michael Wilson",
        product: "USB-C Cable Pack",
        amount: "$19.99",
        status: "Delivered",
        date: "2 days ago",
        avatar: "/placeholder.svg",
    },
]


export const mockProducts = [
    {
        id: "PROD-001",
        title: "Premium Wireless Headphones",
        image: "/placeholder.svg",
        price: 129.99,
        offerPrice: 99.99,
        stock: 45,
        status: "active",
        category: "Electronics",
        variants: ["Black", "White", "Blue"],
    },
    {
        id: "PROD-002",
        title: "Ergonomic Mechanical Keyboard",
        image: "/placeholder.svg",
        price: 89.99,
        offerPrice: null,
        stock: 32,
        status: "active",
        category: "Electronics",
        variants: ["US Layout", "UK Layout"],
    },
    {
        id: "PROD-003",
        title: "Ultra HD Webcam",
        image: "/placeholder.svg",
        price: 69.99,
        offerPrice: 59.99,
        stock: 18,
        status: "active",
        category: "Electronics",
        variants: [],
    },
    {
        id: "PROD-004",
        title: "Portable Bluetooth Speaker",
        image: "/placeholder.svg",
        price: 49.99,
        offerPrice: null,
        stock: 0,
        status: "out_of_stock",
        category: "Electronics",
        variants: ["Black", "Red"],
    },
    {
        id: "PROD-005",
        title: "Wireless Charging Pad",
        image: "/placeholder.svg",
        price: 29.99,
        offerPrice: 24.99,
        stock: 56,
        status: "active",
        category: "Electronics",
        variants: [],
    },
    {
        id: "PROD-006",
        title: "USB-C to HDMI Adapter",
        image: "/placeholder.svg",
        price: 19.99,
        offerPrice: null,
        stock: 72,
        status: "active",
        category: "Electronics",
        variants: [],
    },
    {
        id: "PROD-007",
        title: "Smart Home Hub",
        image: "/placeholder.svg",
        price: 149.99,
        offerPrice: 129.99,
        stock: 12,
        status: "active",
        category: "Smart Home",
        variants: [],
    },
    {
        id: "PROD-008",
        title: "Fitness Tracker",
        image: "/placeholder.svg",
        price: 79.99,
        offerPrice: null,
        stock: 0,
        status: "inactive",
        category: "Wearables",
        variants: ["Small", "Medium", "Large"],
    },
]


export const productStatus = [
    {id : "all" , value:"All Status"},
    {id : "active" , value:"Active"},
    {id : "inactive" , value:"Inactive"},
    {id : "in_stock" , value:"In Strock"},
    {id : "out_in_stock" , value:"Out of stock"}
]
export const productCategories = [
    {id : "all" , value:"All Categories"},
    {id : "electronics" , value:"Electronics"},
    {id : "smart home" , value:"Smart Home"},
    {id : "wearables" , value:"Wearables"},
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


// Mock product data for edit mode
export const mockProductData = {
    "PROD-001": {
        id: "PROD-001",
        title: "Premium Wireless Headphones",
        description:
            "Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design for extended listening sessions.",
        price: "129.99",
        offerPrice: "99.99",
        stock: "45",
        category: "Electronics",
        status: "active",
        images: [],
        variants: [
            { name: "color", values: "Black, White, Blue" },
            { name: "size", values: "Standard" },
        ],
        seo: {
            metaTitle: "Premium Wireless Headphones | Best Sound Quality",
            metaDescription:
                "Shop our Premium Wireless Headphones with active noise cancellation and 30-hour battery life. Free shipping available.",
            keywords: "wireless headphones, noise cancellation, premium audio, bluetooth headphones",
        },
        shipping: {
            weight: "0.35",
            dimensions: {
                length: "20",
                width: "18",
                height: "8",
            },
            freeShipping: true,
        },
        sku: "WH-PRO-001",
        barcode: "8901234567890",
        createdAt: "2023-05-15T10:30:00Z",
        updatedAt: "2023-08-22T14:45:00Z",
        ratings: {
            average: 4.7,
            count: 128,
        },
        tags: ["featured", "bestseller", "premium"],
    },
    "PROD-002": {
        id: "PROD-002",
        title: "Ergonomic Mechanical Keyboard",
        description:
            "Enhance your typing experience with our ergonomic mechanical keyboard. Features customizable RGB lighting, premium Cherry MX switches, and a comfortable wrist rest for extended use.",
        price: "89.99",
        offerPrice: "",
        stock: "32",
        category: "Electronics",
        status: "active",
        images: [],
        variants: [{ name: "layout", values: "US Layout, UK Layout" }],
        seo: {
            metaTitle: "Ergonomic Mechanical Keyboard | Premium Typing Experience",
            metaDescription:
                "Shop our Ergonomic Mechanical Keyboard with Cherry MX switches and customizable RGB lighting. Designed for comfort and performance.",
            keywords: "mechanical keyboard, ergonomic keyboard, cherry mx, rgb keyboard, gaming keyboard",
        },
        shipping: {
            weight: "0.85",
            dimensions: {
                length: "44",
                width: "14",
                height: "4",
            },
            freeShipping: false,
        },
        sku: "KB-ERG-002",
        barcode: "8901234567891",
        createdAt: "2023-06-10T09:15:00Z",
        updatedAt: "2023-09-05T11:20:00Z",
        ratings: {
            average: 4.5,
            count: 96,
        },
        tags: ["new", "premium"],
    },
}


// Image placeholders for edit mode
export const mockImagePreviews = {
    "PROD-001": [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400&text=Side+View",
        "/placeholder.svg?height=400&width=400&text=Package",
    ],
    "PROD-002": [
        "/placeholder.svg?height=400&width=400&text=Keyboard",
        "/placeholder.svg?height=400&width=400&text=RGB+Lighting",
    ],
}