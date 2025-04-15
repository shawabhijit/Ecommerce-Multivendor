"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {ShoppingBag} from "lucide-react"
import PriceDetails from "./PriceDetails"
import { Outlet, useLocation } from "react-router-dom"
import { CartContext } from "./Context/CartContext"

export default function UserCheckoutPage() {

    const location = useLocation();
    const pathSegment = location.pathname.split('/').pop();
    console.log('pathSegment', pathSegment)
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Men's Slim Fit T-Shirt",
            brand: "Roadster",
            image: "/placeholder.svg?height=120&width=90",
            price: 599,
            originalPrice: 999,
            discount: "40% OFF",
            size: "M",
            color: "Navy Blue",
            quantity: 1,
        },
        {
            id: 2,
            name: "Women's Printed Maxi Dress",
            brand: "Antheaa",
            image: "/placeholder.svg?height=120&width=90",
            price: 1299,
            originalPrice: 2599,
            discount: "50% OFF",
            size: "S",
            color: "Floral Print",
            quantity: 1,
        },
    ])



    const updateQuantity = (id : number, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id : number) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
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

    const contextValue = { cartItems, updateQuantity, removeItem }

    return (
        <CartContext.Provider value={contextValue} >
            <div className="container mx-auto px-4 py-32 max-w-7xl">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-2xl font-bold flex items-center">
                        <ShoppingBag className="mr-2 h-6 w-6" />
                        {pathSegment === "cart" && "Shopping Bag"}
                        {pathSegment === "address" && "Select Delivery Address"}
                        {pathSegment === "payment" && "Payment Options"}
                        {pathSegment === "confirmation" && "Order Confirmation"}
                    </h1>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <Outlet />
                        </AnimatePresence>
                    </div>
                    {
                        pathSegment != "confirmation" && <PriceDetails cartItems={cartItems} />
                    }
                </div>
            </div>
        </CartContext.Provider>
    )
}
