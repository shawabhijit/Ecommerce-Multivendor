import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from '../../../../Components/ui/radio-group'
import { Button } from '../../../../Components/ui/button'
import { useNavigate } from 'react-router-dom'
import AddressPage from '../Profile/AddressPage'
import { useAppDispatch, useAppSelecter } from '../../../../app/Store'
import { fetchCustomerProfile } from '../../../../app/customer/CustomerSlice'

const UserAddress = () => {

    const dispatch = useAppDispatch();
    const [addresses, setAddresses] = useState<any>([])

    const fetchData = async () => {
        const res = await dispatch(fetchCustomerProfile())
        // console.log('res', res)
        setAddresses(res.payload.addresses)
    }

    useEffect(() => {
        fetchData()
    }, [dispatch])


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