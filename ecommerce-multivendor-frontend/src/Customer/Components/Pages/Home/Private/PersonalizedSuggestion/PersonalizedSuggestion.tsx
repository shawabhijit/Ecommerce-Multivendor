"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../../../../../Components/ui/button"
import ProductCard from "../HomeProductCard/HomeProductCard"
import { Products } from "../../../../../../types/ProductTupe"

// Mock data for personalized suggestions
const suggestedProducts = [
    {
        id: 401,
        name: "Fitness Tracker",
        price: 79.99,
        image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto,w_400,c_limit,fl_progressive/assets/images/31957213/2024/12/13/0a3eb4de-63eb-4973-8d4f-f45d0aa2326d1734072506200SportsShoes1.jpg",
        rating: 4.6,
    },
    {
        id: 402,
        name: "Portable Charger",
        price: 29.99,
        image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto,w_400,c_limit,fl_progressive/assets/images/31957213/2024/12/13/0a3eb4de-63eb-4973-8d4f-f45d0aa2326d1734072506200SportsShoes1.jpg",
        rating: 4.5,
    },
    {
        id: 403,
        name: "Wireless Mouse",
        price: 24.99,
        image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto,w_400,c_limit,fl_progressive/assets/images/31957213/2024/12/13/0a3eb4de-63eb-4973-8d4f-f45d0aa2326d1734072506200SportsShoes1.jpg",
        rating: 4.4,
    },
    {
        id: 404,
        name: "Desk Organizer",
        price: 19.99,
        image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto,w_400,c_limit,fl_progressive/assets/images/31957213/2024/12/13/0a3eb4de-63eb-4973-8d4f-f45d0aa2326d1734072506200SportsShoes1.jpg",
        rating: 4.3,
    },
    {
        id: 405,
        name: "Water Bottle",
        price: 14.99,
        image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto,w_400,c_limit,fl_progressive/assets/images/31957213/2024/12/13/0a3eb4de-63eb-4973-8d4f-f45d0aa2326d1734072506200SportsShoes1.jpg",
        rating: 4.7,
    },
    {
        id: 406,
        name: "Bluetooth Earbuds",
        price: 59.99,
        image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto,w_400,c_limit,fl_progressive/assets/images/31957213/2024/12/13/0a3eb4de-63eb-4973-8d4f-f45d0aa2326d1734072506200SportsShoes1.jpg",
        rating: 4.8,
    },
]

export default function PersonalizedSuggestions({products}) {

    console.log("products in Recomendations ," , products)
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
            className="bg-white rounded-xl p-6"
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

            <div ref={scrollRef} className="flex flex-wrap overflow-hidden scrollbar-hide gap-6 pb-4">
                {suggestedProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} isInView={isInView} />
                ))}
            </div>
        </motion.div>
    )
}
