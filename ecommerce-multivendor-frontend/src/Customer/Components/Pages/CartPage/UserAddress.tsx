import { useState } from 'react'
import { motion } from "framer-motion"
import { RadioGroup } from '../../../../Components/ui/radio-group'
import { Button } from '../../../../Components/ui/button'
import { useNavigate } from 'react-router-dom'
import AddressPage from '../Profile/AddressPage'
import { useAddress } from '../Context/CartContext'

// Animation variants for containers and items
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const UserAddress = () => {
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState(1);
    const {addresses , refetchProfile} = useAddress();

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
                <AddressPage
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                    refetchProfile={refetchProfile}
                />
            </RadioGroup>
            <div className="flex justify-between mt-4 border-2 border-dashed border-gray-300 rounded-md p-8">
                <Button variant="outline" onClick={() => navigate("/my/cart")} className=''>
                    Back to Bag
                </Button>
                <Button
                    onClick={() => navigate("/my/payment")}
                    className='w-[30%]'
                    disabled={addresses.length === 0}
                >
                    CONTINUE
                </Button>
            </div>
        </motion.div>
    )
}

export default UserAddress