import type { Product } from "./Types"

// Mock data for products
const mockProducts: Product[] = [
    {
        id: "1",
        title: "Premium Wireless Headphones",
        description:
            "Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation and 20-hour battery life.",
        price: 199.99,
        originalPrice: 249.99,
        image: "/placeholder.svg?height=400&width=400",
        images: [
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400&text=Image+2",
            "/placeholder.svg?height=400&width=400&text=Image+3",
            "/placeholder.svg?height=400&width=400&text=Image+4",
        ],
        rating: 4.8,
        reviewCount: 245,
        category: "Electronics",
        inStock: true,
        seller: "AudioTech Inc.",
    },
    {
        id: "2",
        title: "Ergonomic Office Chair",
        description:
            "Stay comfortable during long work hours with this ergonomic office chair. Adjustable height and lumbar support.",
        price: 249.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.5,
        reviewCount: 189,
        category: "furniture",
        inStock: true,
        seller: "ComfortSeating Co.",
    },
    {
        id: "3",
        title: "Smart Fitness Watch",
        description:
            "Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, and water resistance.",
        price: 149.99,
        originalPrice: 179.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.6,
        reviewCount: 312,
        category: "Electronics",
        inStock: true,
        seller: "FitTech Gear",
    },
    {
        id: "4",
        title: "Organic Cotton T-Shirt",
        description: "Comfortable and eco-friendly organic cotton t-shirt. Available in multiple colors and sizes.",
        price: 29.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.3,
        reviewCount: 156,
        category: "clothing",
        inStock: true,
        seller: "EcoWear",
    },
    {
        id: "5",
        title: "Professional DSLR Camera",
        description:
            "Capture stunning photos with this professional-grade DSLR camera. Includes 24-70mm lens and carrying case.",
        price: 1299.99,
        originalPrice: 1499.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.9,
        reviewCount: 87,
        category: "Electronics",
        inStock: false,
        seller: "PhotoPro Equipment",
    },
    {
        id: "6",
        title: "Stainless Steel Water Bottle",
        description: "Keep your drinks hot or cold for hours with this vacuum-insulated stainless steel water bottle.",
        price: 24.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.7,
        reviewCount: 203,
        category: "kitchen",
        inStock: true,
        seller: "EcoHydrate",
    },
    {
        id: "7",
        title: "Wireless Gaming Mouse",
        description:
            "Gain a competitive edge with this high-precision wireless gaming mouse. Features customizable RGB lighting.",
        price: 79.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.5,
        reviewCount: 178,
        category: "Electronics",
        inStock: true,
        seller: "GameGear Pro",
    },
    {
        id: "8",
        title: "Leather Messenger Bag",
        description: "Stylish and durable genuine leather messenger bag perfect for work or casual use.",
        price: 119.99,
        originalPrice: 149.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.6,
        reviewCount: 92,
        category: "accessories",
        inStock: true,
        seller: "Urban Leather Goods",
    },
    {
        id: "9",
        title: "Smart Home Security Camera",
        description:
            "Monitor your home from anywhere with this HD smart security camera. Features motion detection and night vision.",
        price: 89.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.4,
        reviewCount: 136,
        category: "Electronics",
        inStock: true,
        seller: "SecureTech Solutions",
    },
    {
        id: "10",
        title: "Ceramic Coffee Mug Set",
        description: "Set of 4 handcrafted ceramic coffee mugs in assorted colors. Microwave and dishwasher safe.",
        price: 34.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.2,
        reviewCount: 67,
        category: "kitchen",
        inStock: true,
        seller: "ArtisanWare",
    },
    {
        id: "11",
        title: "Bluetooth Portable Speaker",
        description:
            "Take your music anywhere with this waterproof Bluetooth speaker. 12-hour battery life and rich sound quality.",
        price: 59.99,
        originalPrice: 79.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.7,
        reviewCount: 215,
        category: "Electronics",
        inStock: true,
        seller: "SoundWave Audio",
    },
    {
        id: "12",
        title: "Yoga Mat with Carrying Strap",
        description: "Premium non-slip yoga mat with alignment markings and convenient carrying strap.",
        price: 39.99,
        image: "/placeholder.svg?height=400&width=400",
        rating: 4.5,
        reviewCount: 124,
        category: "fitness",
        inStock: true,
        seller: "ZenFit Gear",
    },
]

// Simulate API calls with a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getProducts(): Promise<Product[]> {
    await delay(800) // Simulate network delay
    return mockProducts
}

export async function getProductByid(id: string): Promise<Product> {
    await delay(600) // Simulate network delay
    const product = mockProducts.find((p) => p.id === id)

    if (!product) {
        throw new Error(`Product with id ${id} not found`)
    }

    return product
}
