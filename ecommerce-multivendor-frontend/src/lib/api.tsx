import type { ColorOption, DiscountOption, Product } from "./Types"

// Mock data for products
const mockProducts: Product[] = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id:4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
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
        id: 11,
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
        id: 12,
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

export async function getProductByid(id: number): Promise<Product> {
    await delay(600) // Simulate network delay
    const product = mockProducts.find((p) => p.id === id)

    if (!product) {
        throw new Error(`Product with id ${id} not found`)
    }

    return product
}

export const colorOptions: ColorOption[] = [
    { name: 'Navy Blue', count: 8580, colorCode: '#001f3f', isSelected: false },
    { name: 'Grey', count: 7164, colorCode: '#AAAAAA', isSelected: false },
    { name: 'Beige', count: 4887, colorCode: '#F5F5DC', isSelected: false },
    { name: 'Red', count: 7600, colorCode: '#FF4136', isSelected: false },
    { name: 'Yellow', count: 6800, colorCode: '#FFDC00', isSelected: false },
    { name: 'Orange', count: 5700, colorCode: '#FF851B', isSelected: false },
    { name: 'Purple', count: 4900, colorCode: '#B10DC9', isSelected: false },
    { name: 'Brown', count: 4500, colorCode: '#8B4513', isSelected: false },
    { name: 'Blue', count: 17208, colorCode: '#0074D9', isSelected: false },
    { name: 'White', count: 13504, colorCode: '#FFFFFF', isSelected: false },
    { name: 'Black', count: 10665, colorCode: '#111111', isSelected: false },
    { name: 'Green', count: 9534, colorCode: '#2ECC40', isSelected: false },
    { name: 'Pink', count: 4300, colorCode: '#FF69B4', isSelected: false },
    { name: 'Maroon', count: 3900, colorCode: '#800000', isSelected: false },
    { name: 'Teal', count: 3600, colorCode: '#20B2AA', isSelected: false },
    { name: 'Olive', count: 3400, colorCode: '#808000', isSelected: false },
    { name: 'Sky Blue', count: 3200, colorCode: '#87CEEB', isSelected: false },
    { name: 'Lime', count: 3000, colorCode: '#00FF00', isSelected: false },
    { name: 'Gold', count: 2800, colorCode: '#FFD700', isSelected: false },
    { name: 'Turquoise', count: 2600, colorCode: '#40E0D0', isSelected: false },
];


export const discountOptions: DiscountOption[] = [
    { label: '10% and above', value: 10, isSelected: false },
    { label: '20% and above', value: 20, isSelected: false },
    { label: '30% and above', value: 30, isSelected: false },
    { label: '40% and above', value: 40, isSelected: true },
    { label: '50% and above', value: 50, isSelected: false },
    { label: '60% and above', value: 60, isSelected: false },
    { label: '70% and above', value: 70, isSelected: false },
    { label: '80% and above', value: 80, isSelected: false },
    { label: '90% and above', value: 90, isSelected: false },
];