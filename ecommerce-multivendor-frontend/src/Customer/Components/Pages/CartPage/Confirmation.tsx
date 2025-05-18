// import { useState } from 'react'

import { motion } from "framer-motion"
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../../../../Components/ui/button'
import { useNavigate } from 'react-router-dom'

const Confirmation = () => {
    const navigate = useNavigate();

    // const [paymentMethod, setPaymentMethod] = useState("card")

    return (
        <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
                <CheckCircle2 className="h-10 w-10 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-500 mb-8">Your order has been placed and will be delivered soon.</p>
            <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 text-left mb-8">
                <h3 className="font-semibold mb-2">Order Details</h3>
                <p className="text-gray-600">Order Number: #ORD12345678</p>
                <p className="text-gray-600">
                    Estimated Delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                    Payment Method:{" "}
                    Razorpay
                </p>
            </div>
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </motion.div>
    )
}

export default Confirmation