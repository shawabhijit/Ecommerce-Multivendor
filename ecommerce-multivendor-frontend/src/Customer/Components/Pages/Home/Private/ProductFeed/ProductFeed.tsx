"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../../../../../Components/ui/button"
import ProductCard from "../HomeProductCard/HomeProductCard"

// Mock data for products by category
const productsByCategory = {
    electronics: [
        {
            id: 101,
            name: "Smartphone X",
            price: 799.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.6,
        },
        {
            id: 102,
            name: "Laptop Pro",
            price: 1299.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.8,
        },
        {
            id: 103,
            name: "Wireless Headphones",
            price: 149.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.5,
        },
        {
            id: 104,
            name: 'Smart TV 55"',
            price: 599.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.7,
        },
        {
            id: 105,
            name: "Tablet Air",
            price: 349.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.4,
        },
        {
            id: 106,
            name: "Digital Camera",
            price: 499.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.3,
        },
    ],
    fashion: [
        {
            id: 201,
            name: "Casual T-Shirt",
            price: 24.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.2,
        },
        {
            id: 202,
            name: "Denim Jeans",
            price: 49.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.4,
        },
        {
            id: 203,
            name: "Running Shoes",
            price: 89.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.7,
        },
        {
            id: 204,
            name: "Leather Wallet",
            price: 39.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.5,
        },
        {
            id: 205,
            name: "Sunglasses",
            price: 59.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.3,
        },
        {
            id: 206,
            name: "Wristwatch",
            price: 129.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.6,
        },
    ],
    home: [
        {
            id: 301,
            name: "Coffee Maker",
            price: 79.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.5,
        },
        {
            id: 302,
            name: "Bedding Set",
            price: 99.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.7,
        },
        {
            id: 303,
            name: "Kitchen Knife Set",
            price: 129.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.8,
        },
        {
            id: 304,
            name: "Table Lamp",
            price: 49.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.4,
        },
        {
            id: 305,
            name: "Throw Pillows (Set of 2)",
            price: 34.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.3,
        },
        {
            id: 306,
            name: "Air Purifier",
            price: 149.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.6,
        },
    ],
}

type ProductFeedProps = {
    title: string
    category: "electronics" | "fashion" | "home"
}

export default function ProductFeed({ title, category }: ProductFeedProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const products = productsByCategory[category] || []

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef
            const scrollAmount = 300
            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" })
            }
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="bg-white rounded-xl shadow-sm p-6"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => scroll("left")}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => scroll("right")}>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div ref={scrollRef} className="flex flex-wrap overflow-x-auto scrollbar-hide gap-4 pb-4">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} isInView={isInView} />
                ))}
            </div>
        </motion.div>
    )
}
