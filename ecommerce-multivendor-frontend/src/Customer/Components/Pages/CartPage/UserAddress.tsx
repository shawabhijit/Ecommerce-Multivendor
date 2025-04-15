import React, { useState } from 'react'
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from '../../../../Components/ui/radio-group'
import { Button } from '../../../../Components/ui/button'
import { useNavigate } from 'react-router-dom'
import AddressPage from '../Profile/AddressPage'

const UserAddress = () => {

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "John Doe",
            address: "123 Main Street, Apt 4B",
            city: "New York",
            state: "NY",
            pincode: "10001",
            phone: "123-456-7890",
            isDefault: true,
        },
        {
            id: 2,
            name: "John Doe",
            address: "456 Park Avenue",
            city: "New York",
            state: "NY",
            pincode: "10022",
            phone: "123-456-7890",
            isDefault: false,
        },
    ])

    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState(1)

    return (
        <motion.div
            key="address"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <RadioGroup
                value={selectedAddress.toString()}
                onValueChange={(value) => setSelectedAddress(Number.parseInt(value))}
                className="space-y-4"
            >
                <AddressPage addresses={addresses} setAddresses={setAddresses} />
            </RadioGroup>
            <div className="flex justify-between mt-4 border-2 border-dashed border-gray-300 rounded-md p-8">
                <Button variant="outline" onClick={() => navigate("/my/cart")} className=''>
                    Back to Bag
                </Button>
                <Button onClick={() => navigate("/my/payment")} className='w-[30%]'>CONTINUE</Button>
            </div>
        </motion.div>
    )
}

export default UserAddress