"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Star, X } from "lucide-react"
import { Button } from "../../../../../../Components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

// Define both product structure types
type StandardProduct = {
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

type AlternateProduct = {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string | string[]
    discount?: number
    rating: number
}

export type ProductCardProps = {
    product: StandardProduct | AlternateProduct
    index?: number
    isInView?: boolean
    showDiscount?: boolean
    onRemove?: (id: number) => void
    onMoveToCart?: (id: number) => void
    showWishlistActions?: boolean
}

// Type guard function to determine which product structure we're working with
function isStandardProduct(product: StandardProduct | AlternateProduct): product is StandardProduct {
    return 'title' in product && 'sellingPrice' in product && 'images' in product && Array.isArray(product.images);
}

export default function HomeProductCard({
    product,
    index = 0,
    //isInView,
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

    const navigate = useNavigate();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);


    // Normalize the product data regardless of its structure
    const normalizedProduct = {
        id: product.id,
        title: isStandardProduct(product) ? product.title : product.name,
        sellingPrice: isStandardProduct(product) ? product.sellingPrice : product.price,
        mrpPrice: isStandardProduct(product) ? product.mrpPrice : product.originalPrice,
        images: isStandardProduct(product) ? product.images :
            (Array.isArray(product.image) ? product.image : [product.image]),
        ratings: isStandardProduct(product) ? product.ratings : {
            rating: product.rating,
            count: 0
        },
        discountPrice: isStandardProduct(product) ? product.discountPrice : product.discount,
        brand: isStandardProduct(product) ? product.brand : undefined,
        numRatings: isStandardProduct(product) ? product.numRatings : undefined
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const images = normalizedProduct.images || [];

    const startSlider = () => {
        if (intervalRef.current || images.length <= 1) return;

        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 1500);
    };

    const stopSlider = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = null;
        setCurrentIndex(0);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }; // cleanup
    }, []);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }; // cleanup on unmount
    }, []);

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="min-w-[50%] sm:min-w-[25%] md:min-w-[unset] md:w-[200px] lg:w-[220px] bg-white rounded-lg shadow-sm border overflow-hidden"
        >
            <div
                className="relative cursor-pointer w-full h-[200px] overflow-hidden"
                onMouseEnter={startSlider}
                onMouseLeave={stopSlider}
            >
                {/* Sliding Image Wrapper */}
                <div
                    ref={sliderRef}
                    className="flex h-full w-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={normalizedProduct.title}
                            className="w-full h-full object-cover flex-shrink-0 p-4"
                            onClick={() => navigate(`/product/${normalizedProduct.id}`)}
                        />
                    ))}
                </div>

                {/* Discount Badge */}
                {showDiscount && normalizedProduct.discountPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {normalizedProduct.discountPrice} % OFF
                    </div>
                )}

                {/* Remove Button */}
                {showWishlistActions && onRemove && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 rounded-full h-8 w-8"
                        onClick={() => onRemove(normalizedProduct.id)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="p-4">
                {normalizedProduct.brand && <p className="text-gray-500 text-sm">{normalizedProduct.brand}</p>}
                <h3 className="font-medium text-sm line-clamp-2">{normalizedProduct.title}</h3>

                <div className="flex items-center mt-1 mb-2">
                    <div className="flex items-center bg-green-700 text-white text-xs px-1.5 py-0.5 rounded mr-2">
                        <span>{isStandardProduct(product) ? product.ratings.rating : product.rating}</span>
                        <Star className="h-3 w-3 ml-0.5 fill-white" />
                    </div>
                    {normalizedProduct.numRatings && (
                        <span className="text-gray-500 text-xs">{normalizedProduct.numRatings} reviews</span>
                    )}
                </div>

                <div className="flex items-center">
                    <span className="font-semibold text-gray-900">₹{normalizedProduct.sellingPrice}</span>
                    {normalizedProduct.mrpPrice && (
                        <span className="text-gray-500 line-through text-sm ml-2">
                            ₹{normalizedProduct.mrpPrice}
                        </span>
                    )}
                    {normalizedProduct.discountPrice && (
                        <span className="text-orange-500 text-sm ml-2">{normalizedProduct.discountPrice}</span>
                    )}
                </div>

                {showWishlistActions && onMoveToCart && (
                    <div className="mt-4">
                        <Button
                            onClick={() => onMoveToCart(normalizedProduct.id)}
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