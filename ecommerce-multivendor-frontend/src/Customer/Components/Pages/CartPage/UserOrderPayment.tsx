import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Card, CardContent } from '../../../../Components/ui/card'
import { RadioGroup, RadioGroupItem } from '../../../../Components/ui/radio-group'
import { Label } from '../../../../Components/ui/label'
import { CreditCard, Wallet } from 'lucide-react'
import { Button } from '../../../../Components/ui/button'
import { useNavigate } from 'react-router-dom'

const UserOrderPayment = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("card")



    return (
        <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Card>
                <CardContent className="pt-6">
                    <h2 className="text-lg font-semibold mb-4">Payment Options</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                        <div
                            className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "card" ? "border-primary ring-2 ring-primary/20" : ""
                                }`}
                            onClick={() => setPaymentMethod("card")}
                        >
                            <div className="flex items-center">
                                <RadioGroupItem id="payment-card" value="card" className="mr-2" />
                                <Label htmlFor="payment-card" className="flex items-center cursor-pointer">
                                    <CreditCard className="h-5 w-5 mr-2" />
                                    Credit/Debit Card
                                </Label>
                            </div>
                            {paymentMethod === "card" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="mt-4 overflow-hidden"
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="card-number">Card Number</Label>
                                            <input
                                                id="card-number"
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="expiry">Expiry Date</Label>
                                                <input
                                                    id="expiry"
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="cvv">CVV</Label>
                                                <input
                                                    id="cvv"
                                                    type="text"
                                                    placeholder="123"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="name">Name on Card</Label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="John Doe"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div
                            className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "upi" ? "border-primary ring-2 ring-primary/20" : ""
                                }`}
                            onClick={() => setPaymentMethod("upi")}
                        >
                            <div className="flex items-center">
                                <RadioGroupItem id="payment-upi" value="upi" className="mr-2" />
                                <Label htmlFor="payment-upi" className="flex items-center cursor-pointer">
                                    <Wallet className="h-5 w-5 mr-2" />
                                    UPI / Google Pay / PhonePe
                                </Label>
                            </div>
                            {paymentMethod === "upi" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="mt-4 overflow-hidden"
                                >
                                    <div>
                                        <Label htmlFor="upi-id">UPI ID</Label>
                                        <input
                                            id="upi-id"
                                            type="text"
                                            placeholder="username@upi"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div
                            className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "cod" ? "border-primary ring-2 ring-primary/20" : ""
                                }`}
                            onClick={() => setPaymentMethod("cod")}
                        >
                            <div className="flex items-center">
                                <RadioGroupItem id="payment-cod" value="cod" className="mr-2" />
                                <Label htmlFor="payment-cod" className="flex items-center cursor-pointer">
                                    Cash on Delivery
                                </Label>
                            </div>
                        </div>
                    </RadioGroup>
                    <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={() => navigate("/my/address")}>
                            Back to Address
                        </Button>
                        <Button onClick={() => navigate("/my/confirmation")}>Place Order</Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default UserOrderPayment