"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
    Calendar,
    CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    Filter,
    Search,
} from "lucide-react"

import { Button } from "../../Components/ui/button"
import { Input } from "../../Components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/ui/card"
import { Badge } from "../../Components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../Components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "../../Components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/ui/avatar"
import { Label } from "../../Components/ui/label"
import { Textarea } from "../../Components/ui/textarea"

// Mock data for orders
import { mockOrders } from "../Data/api"
import SellerOrderStatus from "./SellerOrderStatus"
import OrderDetailsDialog from "./OrderDetailsDialog"
import { Calendar as Calendar1 } from "../../Components/ui/calendar"
import { cn } from "../../lib/utils"
import Pagination from "../Components/Pagination/Pagination"


export function OrderManagement() {

    const [orders, setOrders] = useState(mockOrders)

    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [dateFilter, setDateFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
    const [newStatus, setNewStatus] = useState("")
    const [trackingNumber, setTrackingNumber] = useState("")
    const [trackingNotes, setTrackingNotes] = useState("")
    const [date, setDate] = React.useState<Date>()


    const ordersPerPage = 5

    // Filter orders based on search query and filters
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || statusFilter === order.status

        // Date filtering logic
        let matchesDate = true
        const orderDate = new Date(order.date)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (dateFilter === "today") {
            matchesDate = orderDate.toDateString() === today.toDateString()
        } else if (dateFilter === "yesterday") {
            matchesDate = orderDate.toDateString() === yesterday.toDateString()
        } else if (dateFilter === "last7days") {
            const last7Days = new Date(today)
            last7Days.setDate(last7Days.getDate() - 7)
            matchesDate = orderDate >= last7Days
        } else if (dateFilter === "last30days") {
            const last30Days = new Date(today)
            last30Days.setDate(last30Days.getDate() - 30)
            matchesDate = orderDate >= last30Days
        }

        return matchesSearch && matchesStatus && matchesDate
    })

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)

    // const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    //

    const viewOrderDetails = (order: (typeof mockOrders)[0]) => {
        setSelectedOrder(order)
        setIsOrderDetailsOpen(true)
    }

    const openUpdateStatus = (order: (typeof mockOrders)[0]) => {
        setSelectedOrder(order)
        setNewStatus(order.status)
        setIsUpdateStatusOpen(true)
    }

    const updateOrderStatus = () => {
        if (selectedOrder && newStatus) {
            const updatedOrders = orders.map((order) =>
                order.id === selectedOrder.id ? { ...order, status: newStatus } : order,
            )
            setOrders(updatedOrders)
            setIsUpdateStatusOpen(false)
        }
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
        return new Date(dateString).toLocaleDateString("en-US", options)
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "delivered":
                return (
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        Delivered
                    </Badge>
                )
            case "shipped":
                return (
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        Shipped
                    </Badge>
                )
            case "processing":
                return (
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                        Processing
                    </Badge>
                )
            case "pending":
                return (
                    <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                        Pending
                    </Badge>
                )
            case "cancelled":
                return (
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                        Cancelled
                    </Badge>
                )
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getPaymentStatusBadge = (status: string) => {
        switch (status) {
            case "paid":
                return (
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        Paid
                    </Badge>
                )
            case "pending":
                return (
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                        Pending
                    </Badge>
                )
            case "refunded":
                return (
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                        Refunded
                    </Badge>
                )
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="container mx-auto px-4 lg:px-8 overflow-y-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Order Management</h1>
                    <p className="text-gray-500">Manage and process customer orders</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" /> Export
                    </Button>
                    <Button className="flex items-center gap-2">
                        <Filter className="h-4 w-4" /> Advanced Filter
                    </Button>
                </div>
            </div>

            {/* Order Stats */}
            <SellerOrderStatus orders={orders} />

            {/* Filters and Search */}
            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search orders by ID, customer name or email..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={dateFilter} onValueChange={setDateFilter}>
                                <SelectTrigger className="w-full sm:w-[180px] overflow-hidden">
                                    <SelectValue placeholder="Filter by date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Time</SelectItem>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="yesterday">Yesterday</SelectItem>
                                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                                </SelectContent>
                            </Select>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[40px] justify-start text-right font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar1
                                        mode="single"
                                        selected={date}
                                        onSelect={() => setDate(date as Date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Orders</CardTitle>
                            <CardDescription>{filteredOrders.length} orders found</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-4 text-left">Order ID</th>
                                    <th className="py-3 px-4 text-left">Customer</th>
                                    <th className="py-3 px-4 text-left">Date</th>
                                    <th className="py-3 px-4 text-left">Total</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-left">Payment</th>
                                    <th className="py-3 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="py-3 px-4">
                                            <span className="font-medium">{order.id}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={order.customer.avatar || "/placeholder.svg"} />
                                                    <AvatarFallback>{order.customer.name.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{order.customer.name}</p>
                                                    <p className="text-xs text-gray-500">{order.customer.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <p className="text-sm">{formatDate(order.date)}</p>
                                        </td>
                                        <td className="py-3 px-4">
                                            <p className="font-medium">${order.total.toFixed(2)}</p>
                                        </td>
                                        <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                                        <td className="py-3 px-4">{getPaymentStatusBadge(order.paymentStatus)}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => viewOrderDetails(order)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button className="cursor-pointer " variant="outline" size="sm">
                                                            Actions
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => viewOrderDetails(order)}>View Details</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => openUpdateStatus(order)}>Update Status</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                                                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {currentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-gray-500">
                                            No orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination 
                            filteredOrders={filteredOrders}
                            totalPages={totalPages}
                            indexOfFirstOrder={indexOfFirstOrder}
                            indexOfLastOrder={indexOfLastOrder}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Order Details Dialog */}
            <OrderDetailsDialog selectedOrder={selectedOrder} formatDate={formatDate} getStatusBadge={getStatusBadge} setIsOrderDetailsOpen={setIsOrderDetailsOpen} 
                isOrderDetailsOpen={isOrderDetailsOpen} openUpdateStatus={openUpdateStatus}/>

            {/* Update Status Dialog */}
            <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Order Status</DialogTitle>
                        <DialogDescription>Change the status for order {selectedOrder?.id}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={newStatus} onValueChange={setNewStatus}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {newStatus === "shipped" && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="tracking">Tracking Number</Label>
                                    <Input
                                        id="tracking"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        placeholder="Enter tracking number"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={trackingNotes}
                                        onChange={(e) => setTrackingNotes(e.target.value)}
                                        placeholder="Add any shipping notes"
                                        rows={3}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={updateOrderStatus}>Update Status</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
