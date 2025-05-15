"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, CheckCircle, Clock, DollarSign, IndianRupee, Package, ShoppingCart, Users, XCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/ui/card"
import { Button } from "../../Components/ui/button"
import { Badge } from "../../Components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/ui/avatar"
import { Progress } from "../../Components/ui/progress"
import { useAppDispatch } from "../../app/Store"
import { fetchAllSellerOrders } from "../../app/seller/SellerOrderSlice"
import { fetchSellerProducts } from "../../app/seller/SellerProductSlice"
import { useNavigate } from "react-router-dom"


const verificationStatus = {
    status: "Pending",
    progress: 75,
    steps: [
        { name: "Account Created", completed: true },
        { name: "Business Details", completed: true },
        { name: "Document Verification", completed: false },
        { name: "Bank Account Verification", completed: false },
    ],
}

export function SellerDashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    // const [verificationProgress, setVerificationProgress] = useState();
    const [orders, setOrders] = useState<any[]>([])
    const [products, setProducts] = useState<any[]>([])
    const [viewAllOrders, setViewAllOrders] = useState(false);

    const fetchSellerOrders = async () => {
        const res = await dispatch(fetchAllSellerOrders());
        console.log("All orders of seler :", res.payload)
        if (res.meta.requestStatus == "fulfilled") {
            setOrders(res.payload);
        }
    }

    const fetchSellerAllProducts = async () => {
        const res = await dispatch(fetchSellerProducts());
        console.log("All products of seller :", res.payload)
        if (res.meta.requestStatus == "fulfilled") {
            setProducts(res.payload);
        }
    }

    const recentOrders = orders.slice(0, 5);

    const totalCustomer = new Set(orders.map(order => order.user.id)).size;
    const totalSales = orders.reduce((acc, order) => acc + order.totalMrpPrice, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;

    //const topProducts = products.slice(0, 5);


    useEffect(() => {
        fetchSellerOrders();
        fetchSellerAllProducts();
    }, [dispatch])

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Delivered":
                return (
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="mr-1 h-3 w-3" /> {status}
                    </Badge>
                )
            case "Processing":
                return (
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        <Clock className="mr-1 h-3 w-3" /> {status}
                    </Badge>
                )
            case "Shipped":
                return (
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                        <Package className="mr-1 h-3 w-3" /> {status}
                    </Badge>
                )
            case "Cancelled":
                return (
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                        <XCircle className="mr-1 h-3 w-3" /> {status}
                    </Badge>
                )
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className=" mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Seller Dashboard</h1>
                    <p className="text-gray-500">Welcome back! Here's what's happening with your store today.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Button>View Reports</Button>
                </div>
            </div>

            {/* Verification Status Card */}
            {verificationStatus.status !== "Completed" && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Account Verification</CardTitle>
                            <CardDescription>Complete these steps to fully activate your seller account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">Verification Progress</span>
                                    <span className="text-sm font-medium">{verificationStatus.progress}%</span>
                                </div>
                                <Progress value={verificationStatus.progress} className="h-2" />
                            </div>
                            <div className="space-y-4">
                                {verificationStatus.steps.map((step, index) => (
                                    <div key={index} className="flex items-start">
                                        <div
                                            className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${step.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                                                }`}
                                        >
                                            {step.completed ? (
                                                <CheckCircle className="h-4 w-4" />
                                            ) : (
                                                <span className="text-xs font-medium">{index + 1}</span>
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <p className={`text-sm font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
                                                {step.name}
                                            </p>
                                            {!step.completed && (
                                                <Button variant="link" className="h-auto p-0 text-xs text-primary">
                                                    Complete Now
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-full bg-green-100 text-green-700`}>
                                    <IndianRupee className="h-5 w-5" />
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span className={`text-sm text-green-600`}>
                                        +12.5%
                                    </span>
                                    <ArrowUp className="h-3 w-3 text-green-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
                                <p className="text-2xl font-bold">₹{totalSales}</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-full bg-blue-100 text-blue-700`}>
                                    <ShoppingCart className="h-5 w-5" />
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span className={`text-sm text-green-600`}>
                                        +8.2%
                                    </span>
                                    <ArrowUp className="h-3 w-3 text-green-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-500">Orders</h3>
                                <p className="text-2xl font-bold">{totalOrders}</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-full bg-purple-100 text-purple-700`}>
                                    <IndianRupee className="h-5 w-5" />
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span className={`text-sm text-green-600`}>
                                        +4
                                    </span>
                                    <ArrowUp className="h-3 w-3 text-green-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-500">Products</h3>
                                <p className="text-2xl font-bold">{totalProducts}</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-full bg-amber-100 text-amber-700`}>
                                    <IndianRupee className="h-5 w-5" />
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span className={`text-sm text-green-600`}>
                                        +18.3%
                                    </span>
                                    <ArrowUp className="h-3 w-3 text-green-600" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-gray-500">Customers</h3>
                                <p className="text-2xl font-bold">{totalCustomer}</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Tabs for different sections */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                    <TabsTrigger value="products">Top Products</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Orders Card */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                                <CardDescription>You have {recentOrders.length} orders recently</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {viewAllOrders
                                        ? recentOrders.map((order) => (
                                            <motion.div
                                                key={order.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Avatar>
                                                        {/* <AvatarImage src={order.avatar || "/placeholder.svg"} /> */}
                                                        <AvatarFallback>{order.user.username.substring(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{order.user.username}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {order.orderItems.map(prod => prod.product.title).join(" | ")}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">₹{order.totalMrpPrice}</p>
                                                    <div className="mt-1">{getStatusBadge(order.orderStatus.toLowerCase())}</div>
                                                </div>
                                            </motion.div>
                                        ))
                                        : recentOrders.slice(0, 3).map((order) => (
                                            <motion.div
                                                key={order.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Avatar>
                                                        {/* <AvatarImage src={order.avatar || "/placeholder.svg"} /> */}
                                                        <AvatarFallback>{order.user.username.substring(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{order.user.username}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {order.orderItems.map(prod => prod.product.title).join(" | ")}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">₹{order.totalMrpPrice}</p>
                                                    <div className="mt-1">{getStatusBadge(order.orderStatus.toLowerCase())}</div>
                                                </div>
                                            </motion.div>
                                        ))
                                    }
                                    
                                    {
                                        viewAllOrders ? (
                                            <Button variant="outline" className="w-full" onClick={() => setViewAllOrders(false)}>
                                                View Less
                                            </Button>
                                        ) : (
                                            <Button onClick={() => setViewAllOrders(true)} variant="outline" className="w-full">
                                                View All Orders
                                            </Button>
                                        )
                                    }
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>Manage your store efficiently</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button onClick={() => navigate("/seller/products/add")} variant="outline" className="w-full justify-start">
                                    <Package className="mr-2 h-4 w-4" /> Add New Product
                                </Button>
                                <Button onClick={() => navigate("/seller/orders")} variant="outline" className="w-full justify-start">
                                    <ShoppingCart className="mr-2 h-4 w-4" /> Process Orders
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <DollarSign className="mr-2 h-4 w-4" /> Request Payout
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Users className="mr-2 h-4 w-4" /> View Customers
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="orders" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Recent Orders</CardTitle>
                            <CardDescription>Showing your last 5 orders</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentOrders.map((order, index) => (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage src={order.avatar || "/placeholder.svg"} />
                                                <AvatarFallback>{order.user.username.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center">
                                                    <p className="font-medium">{order.user.username}</p>
                                                    <p className="ml-2 text-xs text-gray-500">({order.id})</p>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {order.orderItems.map(prod => prod.product.title).join(" | ")}
                                                </p>
                                                <p className="text-xs text-gray-400">{order.orderDate}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">₹{order.totalMrpPrice}</p>
                                            <div className="mt-1">{getStatusBadge(order.orderStatus)}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="products" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Selling Products</CardTitle>
                            <CardDescription>Your best performing products this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                                            <Package className="h-6 w-6 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Premium Headphones</p>
                                            <p className="text-sm text-gray-500">42 sold this month</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">₹5,459.88</p>
                                        <p className="text-sm text-green-600">+12% from last month</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                                            <Package className="h-6 w-6 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Wireless Keyboard</p>
                                            <p className="text-sm text-gray-500">38 sold this month</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">₹2,279.62</p>
                                        <p className="text-sm text-green-600">+8% from last month</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                                            <Package className="h-6 w-6 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Smart Watch</p>
                                            <p className="text-sm text-gray-500">27 sold this month</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">₹5,399.73</p>
                                        <p className="text-sm text-red-600">-3% from last month</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
