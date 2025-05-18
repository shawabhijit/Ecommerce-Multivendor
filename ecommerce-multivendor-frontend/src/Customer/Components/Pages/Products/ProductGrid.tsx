"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ProductCard from "./ProductCard"
import { Products } from "../../../../types/ProductTupe"

export default function ProductGrid({ products }: { products: Products[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
                <ProductCardWithAnimation key={product.id} product={product} index={index} />
            ))}
        </div>
    )
}

function ProductCardWithAnimation({ product, index }: { product: Products; index: number }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <ProductCard product={product} />
        </motion.div>
    )
}
