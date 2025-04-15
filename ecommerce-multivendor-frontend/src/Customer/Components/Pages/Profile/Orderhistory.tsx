import { Button } from '../../../../Components/ui/button'
import { Card, CardContent } from '../../../../Components/ui/card'
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag } from 'lucide-react'

const Orderhistory = ({ orders, containerVariants, itemVariants }: any) => {
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
                                    <p className="text-gray-500 text-sm">Placed on {order.date}</p>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <p className="font-medium">{order.amount}</p>
                                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center py-3 border-b last:border-b-0">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            className="w-16 h-20 object-cover rounded mr-4"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-gray-500 text-sm">
                                                {item.color} | Size: {item.size}
                                            </p>
                                        </div>
                                        <p className="font-medium">{item.price}</p>
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