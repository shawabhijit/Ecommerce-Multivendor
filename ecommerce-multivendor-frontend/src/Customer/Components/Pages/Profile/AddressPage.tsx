import { z } from 'zod'
import { Button } from '../../../../Components/ui/button'
import { Card, CardContent } from '../../../../Components/ui/card'
import { Input } from '../../../../Components/ui/input'
import { Label } from "../../../../Components/ui/label"
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '../../../../app/Store'
import { updateCustomerProfileAddress } from '../../../../app/customer/CustomerSlice'
import { useAddress } from '../Context/CartContext'

const addressesData = z.object({
    pickupBusinessName: z.string().min(3, "Name is required"),
    pickupAddress: z.string().min(3, "Address is required"),
    pickupCity: z.string().min(3, "City is required"),
    pickupState: z.string().min(3, "State is required"),
    pinCode: z.string().min(6, "Pincode is required"),
    pickupPhone: z.string().min(10, "Phone number is required"),
    default: z.boolean().optional(),
})

type AddressFormData = z.infer<typeof addressesData>

const AddressPage = ({ containerVariants, itemVariants, refetchProfile }) => {
    // Access the context values
    const { addresses, handleRemoveAddress, handleSetDefaultAddress, setAddresses } = useAddress();
    console.log("address page address -" , addresses)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<AddressFormData>({
        resolver: zodResolver(addressesData),
        defaultValues: {
            pickupBusinessName: "",
            pickupAddress: "",
            pickupCity: "",
            pickupState: "",
            pinCode: "",
            pickupPhone: "",
            default: false,
        },
    })

    const dispatch = useAppDispatch();
    const [isAddingAddress, setIsAddingAddress] = useState(false)

    const onsubmit = async (data: AddressFormData) => {
        console.log("Form data:", data)
        const res = await dispatch(updateCustomerProfileAddress(data));
        console.log("Updated address response:", res)
        if (res.meta.requestStatus === "fulfilled") {
            setIsAddingAddress(false);

            // After successful API call, refetch the profile to get updated data
            refetchProfile();
            reset();
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Address Book</h2>
                    <Button onClick={() => setIsAddingAddress(true)} className="flex items-center gap-1 cursor-pointer">
                        <Plus className="h-4 w-4" /> Add New Address
                    </Button>
                </div>

                <AnimatePresence>
                    {isAddingAddress && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 overflow-hidden"
                        >
                            <Card className="border-dashed">
                                <CardContent className="pt-6">
                                    <h3 className="text-lg font-medium mb-4">Add New Address</h3>
                                    <form onSubmit={handleSubmit(onsubmit)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="pickupBusinessName">Full Name</Label>
                                                <Input
                                                    id="pickupBusinessName"
                                                    type='text'
                                                    {...register("pickupBusinessName")}
                                                />
                                                {errors.pickupBusinessName && (
                                                    <p className="text-red-500 text-xs">{errors.pickupBusinessName.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pickupPhone">Phone Number</Label>
                                                <Input
                                                    id="pickupPhone"
                                                    type='text'
                                                    {...register("pickupPhone")}
                                                />
                                                {errors.pickupPhone && (
                                                    <p className="text-red-500 text-xs">{errors.pickupPhone.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="pickupAddress">Address</Label>
                                                <Input
                                                    id="pickupAddress"
                                                    type='text'
                                                    {...register("pickupAddress")}
                                                />
                                                {errors.pickupAddress && (
                                                    <p className="text-red-500 text-xs">{errors.pickupAddress.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pickupCity">City</Label>
                                                <Input
                                                    id="pickupCity"
                                                    type='text'
                                                    {...register("pickupCity")}
                                                />
                                                {errors.pickupCity && (
                                                    <p className="text-red-500 text-xs">{errors.pickupCity.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pickupState">State</Label>
                                                <Input
                                                    id="pickupState"
                                                    type='text'
                                                    {...register("pickupState")}
                                                />
                                                {errors.pickupState && (
                                                    <p className="text-red-500 text-xs">{errors.pickupState.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pinCode">Pincode</Label>
                                                <Input
                                                    id="pinCode"
                                                    type='text'
                                                    {...register("pinCode")}
                                                />
                                                {errors.pinCode && (
                                                    <p className="text-red-500 text-xs">{errors.pinCode.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2 flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="new-default"
                                                    className="mr-2"
                                                    {...register("default")}
                                                    checked={watch("default")}
                                                    onChange={(e) => setValue("default", e.target.checked)}
                                                />
                                                <Label htmlFor="new-default">Set as default address</Label>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-6">
                                            <Button type='submit' className='cursor-pointer'>Save Address</Button>
                                            <Button className='cursor-pointer' variant="outline" onClick={() => setIsAddingAddress(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                    {addresses?.length > 0 ? (
                        addresses.map((address) => (
                            <motion.div key={address.id} variants={itemVariants} className="border rounded-lg p-4 relative">
                                {address?.default && (
                                    <span className="absolute top-4 right-4 md:top-6 md:right-32 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                        Default
                                    </span>
                                )}
                                <div className="flex flex-col md:flex-row md:justify-between">
                                    <div>
                                        <p className="font-medium">{address?.pickupBusinessName}</p>
                                        <p className="text-gray-600">{address?.pickupAddress}</p>
                                        <p className="text-gray-600">
                                            {address?.pickupCity}, {address?.pickupState} - {address?.pinCode}
                                        </p>
                                        <p className="text-gray-600 mt-1">Phone: {address?.pickupPhone}</p>
                                    </div>
                                    <div className="flex gap-2 mt-4 md:mt-0">
                                        {!address?.default && (
                                            <Button variant="outline" size="sm" onClick={() => handleSetDefaultAddress(address.id)}>
                                                Set as Default
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-red-300 text-red-600 hover:bg-red-50"
                                            onClick={() => handleRemoveAddress(address?.id)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-6 border border-dashed rounded-lg">
                            <p className="text-gray-500">No addresses added yet</p>
                            <Button
                                variant="outline"
                                className="mt-2"
                                onClick={() => setIsAddingAddress(true)}
                            >
                                Add Your First Address
                            </Button>
                        </div>
                    )}
                </motion.div>
            </CardContent>
        </Card>
    )
}

export default AddressPage