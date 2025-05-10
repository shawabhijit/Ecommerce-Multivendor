"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import PriceDetails from "./PriceDetails"
import { Outlet, useLocation } from "react-router-dom"
import { Address, AddressProvider, CartContext } from "../Context/CartContext"
import { useAppDispatch } from "../../../../app/Store"
import { fetchCartData } from "../../../../app/customer/CartSlice"
import { fetchCustomerProfile } from "../../../../app/customer/CustomerSlice"

export default function UserCheckoutPage() {

    const location = useLocation();
    const pathSegment = location.pathname.split('/').pop();
    console.log('pathSegment', pathSegment)
    const dispatch = useAppDispatch();

    const [cartItems, setCartItems] = useState<any>([])
    const [addresses, setAddresses] = useState<Address[]>([]);

    const fetchCart = async () => {
        const res = await dispatch(fetchCartData());
        console.log("Cart fetch successfully, Response:", res);
        if (res.meta.requestStatus === "fulfilled") {
            setCartItems(res?.payload.cartItems);
        }
        else {
            console.error("fetch cart data failed:", res.payload.message);
            setCartItems([]);
        }
    }

    const fetchData = async () => {
        const res = await dispatch(fetchCustomerProfile());
        console.log('res', res);
        if (res.meta.requestStatus === "fulfilled") {
            setAddresses(res.payload.addresses);
        }
    }

    // useEffect(() => {
    //     fetchData();
    // }, [dispatch]);

    const refetchProfile = () => {
        fetchData();
    };

    useEffect(() => {
        fetchCart();
        fetchData();
    }, [dispatch])



    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id: number) => {
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
            <AddressProvider initialAddresses={addresses} refetchProfile={refetchProfile}>
            <div className="container mx-auto px-4 py-32 max-w-7xl min-h-screen">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-2xl font-bold flex items-center">
                        <ShoppingBag className="mr-2 h-6 w-6" />
                        {pathSegment === "cart" && "Shopping Bag"}
                        {pathSegment === "address" && "Select Delivery Address"}
                        {pathSegment === "payment" && "Payment Options"}
                        {(pathSegment !== "cart" && pathSegment !== "address" && pathSegment !== "payment") && "Order Confirmation"}
                    </h1>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <Outlet />
                        </AnimatePresence>
                    </div>
                    {
                            (pathSegment === "cart" || pathSegment === "address" || pathSegment == "payment") && <PriceDetails cartItems={cartItems} />
                    }
                </div>
            </div>
            </AddressProvider>
        </CartContext.Provider>
    )
}
