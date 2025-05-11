import { Button } from '../../../../Components/ui/button'
import { Card, CardContent } from '../../../../Components/ui/card'
import { motion } from "framer-motion"
import { ShoppingBag } from 'lucide-react'

const Orderhistory = ({ orders, containerVariants, itemVariants }: any) => {

    console.log("order history under order component " , orders)
    return (
        <Card>
            <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-6">Order History</h2>
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                    {orders.map((order) => (
                        <motion.div key={order.id} variants={itemVariants} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between">
                                <div>
                                    <p className="font-medium">Order #{order.id}</p>
                                    <p className="text-gray-500 text-sm">Placed on {order.orderDate}</p>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <p className="font-medium">{order.totalMrpPrice}</p>
                                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center py-3 border-b last:border-b-0">
                                        <img
                                            src={item.product.images[0] || "/placeholder.svg"}
                                            alt={item.product.title}
                                            className="w-16 h-20 object-cover rounded mr-4"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.product.title}</p>
                                            <p className="text-gray-500 text-sm">
                                                {item.color} | Size: {item.product.variants?.filter((variant: any) => variant.name === "size").map((variant: any) => variant.value).join(", ")}
                                            </p>
                                        </div>
                                        <p className="font-medium">{item.product.mrpPrice}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gray-50 p-4 flex justify-end">
                                <Button variant="outline" size="sm">
                                    <ShoppingBag className="h-4 w-4 mr-2" /> View Details
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </CardContent>
        </Card>
    )
}

export default Orderhistory