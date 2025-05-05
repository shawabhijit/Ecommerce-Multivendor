import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../Components/ui/tabs'
import { Package } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../Components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../Components/ui/dialog'
import { Button } from '../../Components/ui/button'
import { Badge } from '../../Components/ui/badge'

const OrderDetailsDialog = ({ selectedOrder, formatDate, getStatusBadge, setIsOrderDetailsOpen, isOrderDetailsOpen, openUpdateStatus }) => {
    return (
        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
            <DialogContent className="min-w-4xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Order Details - {selectedOrder?.id}</span>
                        <Badge variant="outline" className="ml-2 mr-4">
                            {(selectedOrder?.status ?? "").charAt(0).toUpperCase() + (selectedOrder?.status ?? "").slice(1)}
                        </Badge>
                    </DialogTitle>
                    <DialogDescription>Placed on {selectedOrder && formatDate(selectedOrder.date)}</DialogDescription>
                </DialogHeader>

                {selectedOrder && (
                    <div className="space-y-6">
                        <Tabs defaultValue="items">
                            <TabsList className="grid grid-cols-3">
                                <TabsTrigger value="items">Order Items</TabsTrigger>
                                <TabsTrigger value="customer">Customer Info</TabsTrigger>
                                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                            </TabsList>

                            <TabsContent value="items" className="space-y-4">
                                <div className="border rounded-lg divide-y">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="h-6 w-6 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-medium">${item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span>${selectedOrder.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Shipping</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Tax</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-medium">
                                        <span>Total</span>
                                        <span>${selectedOrder.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="customer" className="space-y-4">
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={selectedOrder.customer.avatar || "/placeholder.svg"} />
                                            <AvatarFallback>{selectedOrder.customer.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-medium">{selectedOrder.customer.name}</h3>
                                            <p className="text-sm text-gray-500">{selectedOrder.customer.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-sm font-medium mb-1">Shipping Address</h4>
                                            <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.street}</p>
                                            <p className="text-sm text-gray-500">
                                                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                                                {selectedOrder.shippingAddress.zip}
                                            </p>
                                            <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.country}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium mb-1">Billing Address</h4>
                                            <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.street}</p>
                                            <p className="text-sm text-gray-500">
                                                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                                                {selectedOrder.shippingAddress.zip}
                                            </p>
                                            <p className="text-sm text-gray-500">{selectedOrder.shippingAddress.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="shipping" className="space-y-4">
                                <div className="border rounded-lg p-4">
                                    <h3 className="font-medium mb-2">Shipping Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Status</span>
                                            <span>{getStatusBadge(selectedOrder.status)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Shipping Method</span>
                                            <span>Standard Shipping</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Tracking Number</span>
                                            <span className="text-gray-500">Not available</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Estimated Delivery</span>
                                            <span className="text-gray-500">3-5 business days</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded-lg p-4">
                                    <h3 className="font-medium mb-2">Order Timeline</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-2">
                                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Order Placed</p>
                                                <p className="text-sm text-gray-500">{formatDate(selectedOrder.date)}</p>
                                            </div>
                                        </div>

                                        {selectedOrder.status !== "pending" && (
                                            <div className="flex items-start gap-2">
                                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Processing</p>
                                                    <p className="text-sm text-gray-500">Order confirmed and processed</p>
                                                </div>
                                            </div>
                                        )}

                                        {(selectedOrder.status === "shipped" || selectedOrder.status === "delivered") && (
                                            <div className="flex items-start gap-2">
                                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Shipped</p>
                                                    <p className="text-sm text-gray-500">Order has been shipped</p>
                                                </div>
                                            </div>
                                        )}

                                        {selectedOrder.status === "delivered" && (
                                            <div className="flex items-start gap-2">
                                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Delivered</p>
                                                    <p className="text-sm text-gray-500">Order has been delivered</p>
                                                </div>
                                            </div>
                                        )}

                                        {selectedOrder.status === "cancelled" && (
                                            <div className="flex items-start gap-2">
                                                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Cancelled</p>
                                                    <p className="text-sm text-gray-500">Order has been cancelled</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <DialogFooter>
                            <Button className='cursor-pointer' variant="outline" onClick={() => setIsOrderDetailsOpen(false)}>
                                Close
                            </Button>
                            <Button className='cursor-pointer' onClick={() => openUpdateStatus(selectedOrder)}>Update Status</Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default OrderDetailsDialog