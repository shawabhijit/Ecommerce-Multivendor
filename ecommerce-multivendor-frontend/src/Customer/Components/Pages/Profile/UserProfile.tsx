"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../Components/ui/tabs"
import Orderhistory from "./Orderhistory"
import { useLocation, useNavigate } from "react-router-dom"
import AddressPage from "./AddressPage"
import UserInfo from "./UserInfo"
import PaymentMethods from "./PaymentMethods"
import { useAppDispatch } from "../../../../app/Store"
import { fetchCustomerProfile } from "../../../../app/customer/CustomerSlice"
import { Address, AddressProvider } from "../Context/CartContext"
import { fetchUserOrderHistory } from "../../../../app/customer/OrderSlice"

export default function UserProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [response, setResponse] = useState<any>(null)
    const [addresses, setAddresses] = useState<Address[]>([])

    // const { addresses } = useAddress();
    // console.log("Addresses are:", addresses);

    const queryParams = new URLSearchParams(location.search)
    const initialTab = queryParams.get("tab") || "profile";

    const [currentTab, setCurrentTab] = useState(initialTab);
    const [orders, setOrders] = useState<any>([])

    useEffect(() => {
        setCurrentTab(initialTab)
    }, [initialTab])

    const handleTabCahnge = (value: string) => {
        const params = new URLSearchParams(location.search);
        params.set("tab", value);
        navigate({ pathname: location.pathname, search: params.toString() });
    }

    const fetchData = async () => {
        const res = await dispatch(fetchCustomerProfile())
        console.log('res', res)
        setResponse(res.payload)
        setAddresses(res.payload.addresses)
    }

    const fetchUserOrders = async () => {
        const res = await dispatch(fetchUserOrderHistory());
        console.log("user Order History response ," , res);
        if (res.meta.requestStatus == "fulfilled") {
            setOrders(res.payload);
        }
    }

    const refetchProfile = () => {
        fetchData();
    }

    useEffect(() => {
        fetchData()
        fetchUserOrders()
    }, [dispatch])


    


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
        <AddressProvider initialAddresses={addresses} refetchProfile={refetchProfile}>
        <div className="container mx-auto px-4 py-8 max-w-5xl pt-40 md:pt-32 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center mb-8"
            >
                <div className="">
                    <h1 className="text-2xl font-bold">{response?.username}</h1>
                    <p className="text-gray-500">{response?.email}</p>
                    <p className="text-gray-500">+91 {response?.phone}</p>
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
                            <UserInfo containerVariants={containerVariants} itemVariants={itemVariants} response={response} refetchProfile={refetchProfile} />
                        </TabsContent>

                        <TabsContent value="addresses" className="mt-0">
                            <AddressPage containerVariants={containerVariants} itemVariants={itemVariants} refetchProfile={refetchProfile} />
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
        </AddressProvider>
    )
}
