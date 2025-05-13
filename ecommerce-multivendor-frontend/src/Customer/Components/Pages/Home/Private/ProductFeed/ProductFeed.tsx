"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../../../../../Components/ui/button"
import ProductCard from "../HomeProductCard/HomeProductCard"
import { Products } from "../../../../../../types/ProductTupe"


type ProductFeedProps = {
    products: Products[] | []
    title: string
    category: "Electronics" | "fashion" | "home"
}

export default function ProductFeed({ products ,  title, category }: ProductFeedProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const filteredProducts = products.filter(prod =>  prod.category.name == category) || []
    //console.log("Products in product feed " , products)

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
    // console.log("product is", products[0]);

    
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="bg-white rounded-xl p-6"
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

            <div ref={scrollRef} className="flex flex-wrap overflow-x-auto scrollbar-hide gap-6 pb-4">
                {filteredProducts?.map((product, index) => {
                    // Ensure ratings is always defined and matches expected shape
                    const safeProduct = {
                        ...product,
                        ratings: product.ratings
                            ? { rating: (product.ratings as any).rating ?? (product.ratings as any).average, count: product.ratings.count }
                            : { rating: 0, count: 0 }
                    };
                    return (
                        <ProductCard key={product.id} product={safeProduct} index={index} isInView={isInView} />
                    );
                })}
            </div>
        </motion.div>
    )
}
