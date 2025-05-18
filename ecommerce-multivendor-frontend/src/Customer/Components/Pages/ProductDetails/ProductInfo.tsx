"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, Check, Truck, ShieldCheck, Clock, Heart, ShoppingBag } from "lucide-react"
import { Products } from "../../../../types/ProductTupe"
import { useAppDispatch } from "../../../../app/Store"
import { addProductToCart } from "../../../../app/customer/CartSlice"
import { toast } from "sonner"
import { addProductToWishlist, getWishlistProduct } from "../../../../app/customer/WhishlistSlice"

interface ProductInfoProps {
    product: Products
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)
    const [addToWishlist , setAddToWishlist] = useState(false);
    const dispatch = useAppDispatch();


    const handleAddToCart = async () => {
        setIsAddingToCart(true)

        const data = {
            productId: product.id,
            size:"",
            quantity: quantity,
            mrpPrice: product.mrpPrice
        }

        // Simulate API call
        setTimeout( async () => {
            const res = await dispatch(addProductToCart(data));
            console.log("response to add cart with ," , res);
            if (res.meta.requestStatus == "fulfilled") {
                setIsAddingToCart(false)
                setAddedToCart(true)
            }
            else {
                setIsAddingToCart(false);
                toast.error("Product is already in the cart , please do some changes.")
            }
        }, 1000)
    }

    const handleAddToWishlist = async () => {
        const res = await dispatch(addProductToWishlist(product));
        console.log("response to add wishlist with ,", res);
        if (res.meta.requestStatus == "fulfilled") {
            setAddToWishlist(true);
        }
    }

    useEffect(()=>{
        const fetchWWishlistProductId = async () => {
            const res = await dispatch(getWishlistProduct(product));
            console.log("wishlist product " , res);
            if (res.meta.requestStatus == "rejected") {
                setAddToWishlist(true)
            }
        }
        fetchWWishlistProductId();
    } ,[dispatch])

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>

            <div className="flex items-center mb-4">
                <div className="flex items-center">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <Star
                                key={i}
                                size={18}
                                className={`${i < Math.floor(product.ratings?.count ?? 1) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                        ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                    {product.ratings?.count?.toFixed(1)} ({product.reviews?.length} reviews)
                </span>
            </div>

            <div className="text-3xl font-bold text-gray-900 mb-4">
                ${product.mrpPrice.toFixed(2)}
                {product.sellingPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">${product.sellingPrice.toFixed(2)}</span>
                )}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Available Colors</h3>
                <div className="flex space-x-2">
                    {product.variants?.find(varient => varient.name == "color")
                        ?.value?.split(',')?.map((color) => {
                        const trimColor = color.trim()
                        return (
                            <div
                                key={color}
                                className="w-8 h-8 rounded-full border-2 border-white shadow cursor-pointer hover:scale-110 transition-transform"
                                style={{ backgroundColor: trimColor }}
                            ></div>
                        )
                    })}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        product.variants?.find(varient => varient.name == "size")
                        ?.value?.split(',')?.map(size => (
                            <div
                                key={size}
                                className="px-3 py-1 border rounded-md text-sm cursor-pointer hover:border-hiakri-green hover:text-hiakri-green transition-colors"
                            >
                                {size}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center">
                    <button
                        className="w-8 h-8 border rounded-l-md flex items-center justify-center hover:bg-gray-100"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                        className="w-12 h-8 border-t border-b text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                        className="w-8 h-8 border rounded-r-md flex items-center justify-center hover:bg-gray-100"
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                    className={`flex-1 px-6 py-3 rounded-lg font-medium text-white ${isAddingToCart || addedToCart ? "bg-green-600" : "hiakri-dark-bg"
                        } transition-colors flex items-center justify-center`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || addedToCart}
                >
                    {isAddingToCart ? (
                        <span className="flex items-center">
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Adding...
                        </span>
                    ) : addedToCart ? (
                        <span className="flex items-center ">
                            <Check size={18} className="mr-2" />
                            Go To Cart
                        </span>
                    ) : (
                        <span className="flex gap-2 items-center">
                            <ShoppingBag />
                            Add to Cart
                        </span>
                    )}
                </motion.button>

                <motion.button
                    className="flex-1 px-6 py-3 bg-white border border-black text-black rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToWishlist()}
                >
                    <span className="flex  gap-2 items-center justify-center">
                        <Heart color="red" />
                        {addToWishlist ? "Go To Wishlist" : "Wishlist"}
                    </span>
                </motion.button>
            </div>

            <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                    <Truck size={18} className="mr-2 text-gray-400" />
                    <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <ShieldCheck size={18} className="mr-2 text-gray-400" />
                    <span>2 year extended warranty</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Clock size={18} className="mr-2 text-gray-400" />
                    <span>30 day money back guarantee</span>
                </div>
            </div>
        </div>
    )
}
