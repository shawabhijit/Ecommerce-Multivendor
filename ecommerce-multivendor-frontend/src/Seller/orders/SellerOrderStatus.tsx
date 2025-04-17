import React from 'react'
import { Card, CardContent } from '../../Components/ui/card'
import { ArrowUp, Package, Truck } from 'lucide-react'

const SellerOrderStatus = ({ orders }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                            <Package className="h-5 w-5" />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-sm text-green-600">+12%</span>
                            <ArrowUp className="h-3 w-3 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                        <p className="text-2xl font-bold">{orders.length}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="p-2 rounded-full bg-amber-100 text-amber-700">
                            <Package className="h-5 w-5" />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-sm text-green-600">+5%</span>
                            <ArrowUp className="h-3 w-3 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                        <p className="text-2xl font-bold">{orders.filter((order) => order.status === "pending").length}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                            <Truck className="h-5 w-5" />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-sm text-green-600">+8%</span>
                            <ArrowUp className="h-3 w-3 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-sm font-medium text-gray-500">Shipped</h3>
                        <p className="text-2xl font-bold">{orders.filter((order) => order.status === "shipped").length}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="p-2 rounded-full bg-green-100 text-green-700">
                            <Package className="h-5 w-5" />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-sm text-green-600">+15%</span>
                            <ArrowUp className="h-3 w-3 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-sm font-medium text-gray-500">Delivered</h3>
                        <p className="text-2xl font-bold">{orders.filter((order) => order.status === "delivered").length}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SellerOrderStatus