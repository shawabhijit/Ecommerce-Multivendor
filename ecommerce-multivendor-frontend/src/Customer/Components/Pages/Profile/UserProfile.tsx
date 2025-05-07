"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../Components/ui/tabs"
import Orderhistory from "./Orderhistory"
import { useLocation, useNavigate } from "react-router-dom"
import AddressPage from "./AddressPage"
import UserInfo from "./UserInfo"
import PaymentMethods from "./PaymentMethods"

export default function UserProfile() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search)
    const initialTab = queryParams.get("tab") || "profile";

    const [currentTab, setCurrentTab] = useState(initialTab);

    useEffect(() => {
        setCurrentTab(initialTab)
    }, [initialTab])

    const handleTabCahnge = (value: string) => {
        const params = new URLSearchParams(location.search);
        params.set("tab", value);
        navigate({ pathname: location.pathname, search: params.toString() });
    }

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "John Doe",
            address: "123 Main Street, Apt 4B",
            city: "New York",
            state: "NY",
            pincode: "10001",
            phone: "123-456-7890",
            isDefault: true,
        },
        {
            id: 2,
            name: "John Doe",
            address: "456 Park Avenue",
            city: "New York",
            state: "NY",
            pincode: "10022",
            phone: "123-456-7890",
            isDefault: false,
        },
    ])
    const [orders, setOrders] = useState([
        {
            id: "ORD123456",
            date: "15 Mar 2024",
            amount: "₹2,499",
            status: "Delivered",
            items: [
                {
                    name: "Men's Cotton T-Shirt",
                    color: "Navy Blue",
                    size: "M",
                    price: "₹799",
                    image: "/placeholder.svg?height=80&width=60",
                },
                {
                    name: "Women's Casual Jeans",
                    color: "Light Blue",
                    size: "28",
                    price: "₹1,700",
                    image: "/placeholder.svg?height=80&width=60",
                },
            ],
        },
        {
            id: "ORD789012",
            date: "28 Feb 2024",
            amount: "₹3,999",
            status: "Delivered",
            items: [
                {
                    name: "Running Shoes",
                    color: "Black/Red",
                    size: "UK 9",
                    price: "₹3,999",
                    image: "/placeholder.svg?height=80&width=60",
                },
            ],
        },
    ])


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
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl md:pt-32 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center mb-8"
            >
                <div className="">
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <p className="text-gray-500">john.doe@example.com</p>
                    <p className="text-gray-500">+91 98765 43210</p>
                </div>
            </motion.div>

            <Tabs defaultValue="profile" value={currentTab} onValueChange={handleTabCahnge} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="profile">Personal Info</TabsTrigger>
                    <TabsTrigger value="addresses">Address Book</TabsTrigger>
                    <TabsTrigger value="orders">Order History</TabsTrigger>
                    <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TabsContent value="profile" className="mt-0">
                            <UserInfo containerVariants={containerVariants} itemVariants={itemVariants} />
                        </TabsContent>

                        <TabsContent value="addresses" className="mt-0">
                            <AddressPage addresses={addresses} setAddresses={setAddresses} containerVariants={containerVariants} itemVariants={itemVariants} />
                        </TabsContent>

                        <TabsContent value="orders" className="mt-0">
                            <Orderhistory orders={orders} containerVariants={containerVariants} itemVariants={itemVariants} />
                        </TabsContent>

                        <TabsContent value="payment" className="mt-0">
                            <PaymentMethods containerVariants={containerVariants} itemVariants={itemVariants} />
                        </TabsContent>
                    </motion.div>
                </AnimatePresence>
            </Tabs>
        </div>
    )
}
