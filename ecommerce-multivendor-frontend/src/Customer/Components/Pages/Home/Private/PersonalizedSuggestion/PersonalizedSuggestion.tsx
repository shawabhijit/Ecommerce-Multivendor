"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../../../../../Components/ui/button"
import ProductCard from "../HomeProductCard/HomeProductCard"

// Mock data for personalized suggestions
const suggestedProducts = [
    {
        id: 401,
        name: "Fitness Tracker",
        price: 79.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
    },
    {
        id: 402,
        name: "Portable Charger",
        price: 29.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.5,
    },
    {
        id: 403,
        name: "Wireless Mouse",
        price: 24.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.4,
    },
    {
        id: 404,
        name: "Desk Organizer",
        price: 19.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.3,
    },
    {
        id: 405,
        name: "Water Bottle",
        price: 14.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
    },
    {
        id: 406,
        name: "Bluetooth Earbuds",
        price: 59.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
    },
]

export default function PersonalizedSuggestions() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

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
                <div>
                    <h2 className="text-2xl font-bold">Recommended for You</h2>
                    <p className="text-gray-500">Based on your browsing history</p>
                </div>
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
                {suggestedProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} isInView={isInView} />
                ))}
            </div>
        </motion.div>
    )
}
