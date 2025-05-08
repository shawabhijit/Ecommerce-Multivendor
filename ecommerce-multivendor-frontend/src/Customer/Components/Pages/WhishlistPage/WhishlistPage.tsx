"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../../../Components/ui/button"
import { Heart } from "lucide-react"
import HomeProductCard from "../Home/Private/HomeProductCard/HomeProductCard"
import { useAppDispatch } from "../../../../app/Store"
import { fetchWishlistData } from "../../../../app/customer/WhishlistSlice"
import { addProductToCart } from "../../../../app/customer/CartSlice"

type whishlistRequestProps = {
    productId: number
    size: string
    quantity: number
}

export default function WishlistPage() {
    const dispatch = useAppDispatch();
    const [wishlistItems, setWishlistItems] = useState<any>([])

    const fetchWishlist = async () => {
        const res = await dispatch(fetchWishlistData());
        console.log("Wishlist fetch successfully, Response:", res);
        if (res.meta.requestStatus === "fulfilled") {
            // Transform API data to match the structure expected by HomeProductCard
            const formattedProducts = res.payload.products.map(product => ({
                id: product.id,
                title: product.title,
                sellingPrice: product.sellingPrice,
                mrpPrice: product.mrpPrice,
                discountPrice: product.discountPrice,
                brand: product.seo?.metaTitle?.split(' ')[0] || '',
                images: Array.isArray(product.images) ? product.images : [],
                ratings: {
                    // Handle potentially null rating values
                    rating: product.ratings?.average || 0,
                    count: product.ratings?.count || 0
                },
                numRatings: product.numRatings || 0
            }));
            setWishlistItems(formattedProducts);
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [dispatch])

    const removeFromWishlist = (id) => {
        setWishlistItems(wishlistItems?.filter((item) => item.id !== id))
    }

    const moveToCart = async (id) => {
        const product = wishlistItems?.find((item) => item.id === id)
        if (!product) return
        const request : whishlistRequestProps = {
            productId: product.id,
            size: "XL",
            quantity: 1,
        }
        const res = await dispatch(addProductToCart(request))
        console.log("Product moved to cart successfully, Response:", res);
        if (res.meta.requestStatus === "fulfilled") {
            removeFromWishlist(id)
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

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
        exit: {
            opacity: 0,
            x: -100,
            transition: {
                duration: 0.3,
            },
        },
    }

    return (
        <div className="container mx-auto px-4 py-32 max-w-7xl min-h-screen">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl font-bold flex items-center">
                    <Heart className="mr-2 h-6 w-6 text-rose-500" /> My Wishlist
                    <span className="ml-2 text-gray-500">({wishlistItems.length} items)</span>
                </h1>
            </motion.div>

            {wishlistItems?.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Heart className="h-10 w-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-6">Items added to your wishlist will appear here</p>
                    <Button>Continue Shopping</Button>
                </motion.div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                >
                    <AnimatePresence>
                        {wishlistItems?.map((item, index) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                exit="exit"
                            >
                                <HomeProductCard
                                    product={item}
                                    index={index}
                                    showDiscount={true}
                                    showWishlistActions={true}
                                    onRemove={removeFromWishlist}
                                    onMoveToCart={moveToCart}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    )
}