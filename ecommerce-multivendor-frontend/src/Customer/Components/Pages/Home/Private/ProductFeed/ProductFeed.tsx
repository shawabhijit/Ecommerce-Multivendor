"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../../../../../Components/ui/button"
import ProductCard from "../HomeProductCard/HomeProductCard"

// Mock data for products by category
const productsByCategory  = {
    electronics: [
        {
            id: 101,
            title: "Smartphone X",
            sellingPrice: 799.99,
            mrpPrice: 799.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14920218/2025/3/1/0ed4802a-4e01-45aa-b69e-01a889b82e761740815408512-Braun-Mini-Facial-Hair-Remover-FS1000-for-Upper-Lips-Chin--C-1.jpg"],
            ratings: { rating: 4.6, count: 0 },
        },
        {
            id: 102,
            title: "Laptop Pro",
            sellingPrice: 1299.99,
            mrpPrice: 1299.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14920218/2025/3/1/0ed4802a-4e01-45aa-b69e-01a889b82e761740815408512-Braun-Mini-Facial-Hair-Remover-FS1000-for-Upper-Lips-Chin--C-1.jpg"],
            ratings: { rating: 4.8, count: 0 },
        },
        {
            id: 103,
            title: "Wireless Headphones",
            sellingPrice: 149.99,
            mrpPrice: 149.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14920218/2025/3/1/0ed4802a-4e01-45aa-b69e-01a889b82e761740815408512-Braun-Mini-Facial-Hair-Remover-FS1000-for-Upper-Lips-Chin--C-1.jpg"],
            ratings: { rating: 4.5, count: 0 },
        },
        {
            id: 104,
            title: 'Smart TV 55"',
            sellingPrice: 599.99,
            mrpPrice: 599.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14920218/2025/3/1/0ed4802a-4e01-45aa-b69e-01a889b82e761740815408512-Braun-Mini-Facial-Hair-Remover-FS1000-for-Upper-Lips-Chin--C-1.jpg"],
            ratings: { rating: 4.7, count: 0 },
        },
        {
            id: 105,
            title: "Tablet Air",
            sellingPrice: 349.99,
            mrpPrice: 349.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14920218/2025/3/1/0ed4802a-4e01-45aa-b69e-01a889b82e761740815408512-Braun-Mini-Facial-Hair-Remover-FS1000-for-Upper-Lips-Chin--C-1.jpg"],
            ratings: { rating: 4.4, count: 0 },
        },
        {
            id: 106,
            title: "Digital Camera",
            sellingPrice: 499.99,
            mrpPrice: 499.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14920218/2025/3/1/0ed4802a-4e01-45aa-b69e-01a889b82e761740815408512-Braun-Mini-Facial-Hair-Remover-FS1000-for-Upper-Lips-Chin--C-1.jpg"],
            ratings: { rating: 4.3, count: 0 },
        },
    ],
    fashion: [
        {
            id: 201,
            title: "Casual T-Shirt",
            sellingPrice: 24.99,
            mrpPrice: 24.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/AUGUST/20/TUJvKDIa_bc8b5e64be4e41e5a8550473e9e75c43.jpg"],
            ratings: { rating: 4.2, count: 0 },
        },
        {
            id: 202,
            title: "Denim Jeans",
            sellingPrice: 49.99,
            mrpPrice: 49.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/AUGUST/20/TUJvKDIa_bc8b5e64be4e41e5a8550473e9e75c43.jpg"],
            ratings: { rating: 4.4, count: 0 },
        },
        {
            id: 203,
            title: "Running Shoes",
            sellingPrice: 89.99,
            mrpPrice: 89.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/AUGUST/20/TUJvKDIa_bc8b5e64be4e41e5a8550473e9e75c43.jpg"],
            ratings: { rating: 4.7, count: 0 },
        },
        {
            id: 204,
            title: "Leather Wallet",
            sellingPrice: 39.99,
            mrpPrice: 39.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/AUGUST/20/TUJvKDIa_bc8b5e64be4e41e5a8550473e9e75c43.jpg"],
            ratings: { rating: 4.5, count: 0 },
        },
        {
            id: 205,
            title: "Sunglasses",
            sellingPrice: 59.99,
            mrpPrice: 59.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/AUGUST/20/TUJvKDIa_bc8b5e64be4e41e5a8550473e9e75c43.jpg"],
            ratings: { rating: 4.3, count: 0 },
        },
        {

                id: 206,
                title: "Wristwatch",
                sellingPrice: 129.99,
                mrpPrice: 129.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/AUGUST/20/TUJvKDIa_bc8b5e64be4e41e5a8550473e9e75c43.jpg"],
                ratings: { rating: 4.6, count: 0 },
        },
    ],
    home: [
        {

            id: 301,
            title: "Coffee Maker",
            sellingPrice: 79.99,
            mrpPrice: 79.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/26/MMJoq6zI_59829555afd24584bad0670db18f4351.jpg"],
            ratings: { rating: 4.5, count: 0 },
        },
        {
            id: 302,
            title: "Bedding Set",
            sellingPrice: 99.99,
            mrpPrice: 99.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/26/MMJoq6zI_59829555afd24584bad0670db18f4351.jpg"],
            ratings: { rating: 4.7, count: 0 },
        },
        {
            id: 303,
            title: "Kitchen Knife Set",
            sellingPrice: 129.99,
            mrpPrice: 129.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/26/MMJoq6zI_59829555afd24584bad0670db18f4351.jpg"],
            ratings: { rating: 4.8, count: 0 },
        },
        {
            id: 304,
            title: "Table Lamp",
            sellingPrice: 49.99,
            mrpPrice: 49.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/26/MMJoq6zI_59829555afd24584bad0670db18f4351.jpg"],
            ratings: { rating: 4.4, count: 0 },
        },
        {
            id: 305,
            title: "Throw Pillows (Set of 2)",
            sellingPrice: 34.99,
            mrpPrice: 34.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/26/MMJoq6zI_59829555afd24584bad0670db18f4351.jpg"],
            ratings: { rating: 4.3, count: 0 },
        },
        {
            id: 306,
            title: "Air Purifier",
            sellingPrice: 149.99,
            mrpPrice: 149.99,
            images: ["https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/26/MMJoq6zI_59829555afd24584bad0670db18f4351.jpg"],
            ratings: { rating: 4.6, count: 0 },
        },
    ],
};


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
    // console.log("product is", products[0]);
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
