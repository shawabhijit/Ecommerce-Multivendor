"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import type { Product } from "../../../../lib/Types"
import ProductCard from "../Products/ProductCard"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface RelatedProductsProps {
    products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef
            const scrollAmount = direction === "left" ? -300 : 300
            current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    if (products.length === 0) {
        return null
    }

    return (
        <div className="relative">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
                <motion.button
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                    onClick={() => scroll("left")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft size={24} />
                </motion.button>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {products.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-64">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                <motion.button
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                    onClick={() => scroll("right")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight size={24} />
                </motion.button>
            </div>
        </div>
    )
}
