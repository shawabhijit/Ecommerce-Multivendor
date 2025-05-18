import { Button } from '../../../../Components/ui/button'
import { Card, CardContent } from '../../../../Components/ui/card'
import { CreditCard, Plus, Trash2 } from 'lucide-react'
import { motion } from "framer-motion"

const PaymentMethods = ({ containerVariants, itemVariants }: any) => {

    const paymentMethods = [
        {
            id: 1,
            type: "Credit Card",
            name: "HDFC Bank Credit Card",
            number: "xxxx xxxx xxxx 4567",
            expiry: "05/26",
        },
        {
            id: 2,
            type: "UPI",
            name: "Google Pay",
            number: "xxxx xxxx xxxx 4567",
            expiry: "05/26",
        },
    ]

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Saved Payment Methods</h2>
                    <Button className="flex items-center gap-1">
                        <Plus className="h-4 w-4" /> Add Payment Method
                    </Button>
                </div>
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                    {paymentMethods.map((method) => (
                        <motion.div
                            key={method.id}
                            variants={itemVariants}
                            className="border rounded-lg p-4 flex items-center"
                        >
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                                <CreditCard className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{method.name}</p>
                                {method.type === "Credit Card" ? (
                                    <p className="text-gray-500 text-sm">
                                        {method.number} | Expires: {method.expiry}
                                    </p>
                                ) : (
                                    <p className="text-gray-500 text-sm">{method.id}</p>
                                )}
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    ))}
                </motion.div>
            </CardContent>
        </Card>
    )
}

export default PaymentMethods