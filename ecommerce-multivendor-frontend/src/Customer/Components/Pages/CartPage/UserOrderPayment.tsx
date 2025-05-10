import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Card, CardContent } from '../../../../Components/ui/card'
import { RadioGroup, RadioGroupItem } from '../../../../Components/ui/radio-group'
import { Label } from '../../../../Components/ui/label'
import { CreditCard, Wallet } from 'lucide-react'
import { Button } from '../../../../Components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useAddress } from '../Context/CartContext'
import { useAppDispatch } from '../../../../app/Store'
import { createOrder } from '../../../../app/customer/OrderSlice'

const UserOrderPayment = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");

    const { addresses } = useAddress();
    //console.log("Addresses are:", addresses);

    const noAddresses = !addresses || addresses.length === 0;

    const defaultAddress = addresses?.find(a => a.default) || addresses?.[0];

    //console.log(paymentMethod)

    const createCustomerOrder = async () => {
        // navigate("/my/confirmation")
        const res = await dispatch(createOrder({ address: defaultAddress, paymenyMethod: paymentMethod }));
        console.log("Order respose , " , res)
    }
    return (
        <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            {noAddresses ? (
                <Card className="mb-4">
                    <CardContent className="pt-6">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-yellow-700">
                                No shipping addresses found. Please add an address before proceeding with payment.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-2"
                                onClick={() => navigate("/my/address")}
                            >
                                Add Address
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="mb-4">
                    <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-2">Shipping To</h2>
                        <div className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-medium">{defaultAddress?.pickupBusinessName}</p>
                                    <p className="text-gray-600">{defaultAddress?.pickupAddress}</p>
                                    <p className="text-gray-600">
                                        {defaultAddress?.pickupCity}, {defaultAddress?.pickupState} - {defaultAddress?.pinCode}
                                    </p>
                                    <p className="text-gray-600">Phone: {defaultAddress?.pickupPhone}</p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate("/my/address")}
                                >
                                    Change
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardContent className="pt-6">
                    <h2 className="text-lg font-semibold mb-4">Payment Options</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                        <div
                            className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "RAZORPAY" ? "border-primary ring-2 ring-primary/20" : ""
                                }`}
                            onClick={() => setPaymentMethod("RAZORPAY")}
                        >
                            <div className="flex items-center">
                                <RadioGroupItem id="payment-razorpay" value="RAZORPAY" className="mr-2" />
                                <Label htmlFor="payment-razorpay" className="flex items-center cursor-pointer">
                                    Razorpay
                                </Label>
                            </div>
                        </div>
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
                                        <Label htmlFor="upi-id">UPI id</Label>
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
                        <Button
                            onClick={() => createCustomerOrder()}
                            disabled={noAddresses}
                        >
                            Place Order
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default UserOrderPayment