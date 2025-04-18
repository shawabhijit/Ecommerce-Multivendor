export interface Product {
    id: string
    title: string
    description: string
    price: number
    originalPrice?: number
    image: string
    images?: string[]
    rating: number
    reviewCount: number
    category: string
    inStock: boolean
    seller?: string
}