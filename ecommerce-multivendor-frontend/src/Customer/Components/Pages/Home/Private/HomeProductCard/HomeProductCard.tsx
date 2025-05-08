"use client"

import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, X } from "lucide-react"
import { Button } from "../../../../../../Components/ui/button"

type ProductCardProps = {
    product: {
        id: number
        title: string
        sellingPrice: number
        mrpPrice?: number
        images: string[]
        ratings: {
            rating: number
            count: number
        }
        discountPrice?: number | string
        brand?: string
        numRatings?: number
    }
    index?: number
    isInView?: boolean
    showDiscount?: boolean
    onRemove?: (id: number) => void
    onMoveToCart?: (id: number) => void
    showWishlistActions?: boolean
}


export default function HomeProductCard({
    product,
    index = 0,
    isInView,
    showDiscount = false,
    onRemove,
    onMoveToCart,
    showWishlistActions = false,

}: ProductCardProps) {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
            },
        },
    }

    console.log("product", product)
    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className=" min-w-[50%] sm:min-w-[25%] md:min-w-[unset] md:w-[200px] lg:w-[220px] bg-white rounded-lg shadow-sm border overflow-hidden"
        >
            <div className="relative cursor-pointer">
                {/* <img src={product?.images[0]} alt={product?.title} className="h-full w-full object-contain p-4" /> */}

                {showDiscount && product?.discountPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product?.discountPrice} % OFF
                    </div>
                )}

                {showWishlistActions && onRemove && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 rounded-full h-8 w-8"
                        onClick={() => onRemove(product.id)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="p-4">
                {product.brand && <p className="text-gray-500 text-sm">{product.brand}</p>}
                <h3 className="font-medium text-sm line-clamp-2">{product?.title}</h3>

                <div className="flex items-center mt-1 mb-2">
                    <div className="flex items-center bg-green-700 text-white text-xs px-1.5 py-0.5 rounded mr-2">
                        {/* <span>{product?.ratings.count}</span> */}
                        <Star className="h-3 w-3 ml-0.5 fill-white" />
                    </div>
                    {product?.numRatings && (
                        <span className="text-gray-500 text-xs">{product?.numRatings} reviews</span>
                    )}
                </div>

                <div className="flex items-center">
                    <span className="font-semibold text-gray-900">₹{product?.sellingPrice}</span>
                    {product?.mrpPrice && (
                        <span className="text-gray-500 line-through text-sm ml-2">
                            ₹{product?.mrpPrice}
                        </span>
                    )}
                    {product?.discountPrice && (
                        <span className="text-orange-500 text-sm ml-2">{product?.discountPrice}</span>
                    )}
                </div>

                {showWishlistActions && onMoveToCart && (
                    <div className="mt-4">
                        <Button
                            onClick={() => onMoveToCart(product.id)}
                            variant="outline"
                            className="w-full"
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" /> Move to Cart
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
