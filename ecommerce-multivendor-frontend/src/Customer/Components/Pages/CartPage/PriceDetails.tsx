import React from 'react'
import { motion } from "framer-motion"
import { Card, CardContent } from '../../../../Components/ui/card'
import { Button } from '../../../../Components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'

const PriceDetails = ({ cartItems }) => {

    const navigate = useNavigate();

    const location = useLocation();
    const pathSegment = location.pathname.split('/').pop();

    const subtotal = cartItems.reduce((total, item) => total + item.product.mrpPrice * item.quantity, 0)
    const discount = cartItems.reduce((total, item) => total + (item.product.sellingPrice - item.product.mrpPrice) * item.quantity, 0)
    console.log("subtotal" , subtotal)
    console.log("discount" , discount)
    const deliveryCharge = subtotal > 1000 ? 0 : 99
    const total = subtotal + deliveryCharge

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-80 xl:w-96">
            <div className="sticky top-4">
                <Card>
                    <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4">Price Details</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Price ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                                </span>
                                <span>₹{subtotal + discount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Discount</span>
                                <span className="text-green-600">- ₹{discount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery Charges</span>
                                {deliveryCharge === 0 ? (
                                    <span className="text-green-600">FREE</span>
                                ) : (
                                    <span>₹{deliveryCharge}</span>
                                )}
                            </div>
                            <div className="border-t pt-3 mt-3 font-semibold flex justify-between">
                                <span>Total Amount</span>
                                <span>₹{total}</span>
                            </div>
                            {discount > 0 && (
                                <div className="text-green-600 text-sm">You will save ₹{discount} on this order</div>
                            )}
                        </div>
                        {pathSegment === "cart" && (
                            <Button className="w-full mt-6" onClick={() => navigate("/my/address")}>
                                Proceed to Checkout
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {pathSegment !== "cart" && (
                    <Card className="mt-4">
                        <CardContent className="pt-6">
                            <h2 className="text-sm font-semibold mb-2">Order Summary</h2>
                            <div className="space-y-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center text-sm">
                                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                                        <span className="text-gray-600 truncate flex-1">
                                            {item.name} ({item.size})
                                        </span>
                                        <span>₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </motion.div>
    )
}

export default PriceDetails