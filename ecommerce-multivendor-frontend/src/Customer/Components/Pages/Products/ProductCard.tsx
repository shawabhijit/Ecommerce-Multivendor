"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, Eye, Heart } from "lucide-react"
import { useAppDispatch } from "../../../../app/Store"
import { addProductToWishlist } from "../../../../app/customer/WhishlistSlice"
import { Products } from "../../../../types/ProductTupe"

export default function ProductCard({ product }: { product: Products }) {
    const dispatch = useAppDispatch();
    const [isHovered, setIsHovered] = useState(false)

    const addToWishlist = async () => {
        const res = await dispatch(addProductToWishlist(product))
        if (res.meta.requestStatus === "fulfilled") {
            console.log("Product added to wishlist successfully:", res.payload);
        } else {
            console.error("Failed to add product to wishlist:", res.payload.error);
        }
    }

    return (
        <motion.div
            className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col relative"
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="relative h-48 overflow-hidden">
                <Link to={`/product/${product.id}`}>
                    <img className="object-contain p-4 w-full h-full" src={product.images[0]} alt={product.title} />
                </Link>

                <motion.div
                    className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.button
                        className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToWishlist()}
                    >
                        <Heart size={18} color="red" className=""/>
                    </motion.button>
                    <Link to={`/product/${product.id}`}>
                        <motion.button
                            className="bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Eye size={18} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center mb-1">
                    <div className="flex items-center bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                        <Star size={12} className="fill-current mr-1" />
                        {product.ratings?.count}
                    </div>
                    <div className="text-xs text-gray-500 ml-2">{product?.reviews?.length} reviews</div>
                </div>

                <Link to={`/product/${product.id}`} className="group">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-hiakri-orange transition-colors">
                        {product.title}
                    </h3>
                </Link>

                <p className="text-gray-500 text-sm mb-2 line-clamp-2 flex-1">{product.description}</p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="font-bold text-gray-900">₹{product.mrpPrice.toFixed(2)}</div>
                    <Link to={`/product/${product.id}`}>
                        <motion.button
                            className="text-sm font-medium text-hiakri-dark hover:text-rose-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Details
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
