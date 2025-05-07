import { Button } from '../../../../Components/ui/button'
import { Card, CardContent } from '../../../../Components/ui/card'
import { Input } from '../../../../Components/ui/input'
import { Label } from "../../../../Components/ui/label"
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

const AddressPage = ({ addresses, setAddresses, containerVariants, itemVariants }: any) => {

    const [newAddress, setNewAddress] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        isDefault: false,
    })

    const [isAddingAddress, setIsAddingAddress] = useState(false)

    const handleAddAddress = () => {
        setAddresses([...addresses, { ...newAddress, id: Date.now() }])
        setNewAddress({
            name: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            phone: "",
            isDefault: false,
        })
        setIsAddingAddress(false)
    }

    const handleRemoveAddress = (id) => {
        setAddresses(addresses.filter((address) => address.id !== id))
    }

    const handleSetDefaultAddress = (id) => {
        setAddresses(
            addresses.map((address) => ({
                ...address,
                isDefault: address.id === id,
            })),
        )
    }
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Address Book</h2>
                    <Button onClick={() => setIsAddingAddress(true)} className="flex items-center gap-1">
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-name">Full Name</Label>
                                            <Input
                                                id="new-name"
                                                value={newAddress.name}
                                                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-phone">Phone Number</Label>
                                            <Input
                                                id="new-phone"
                                                value={newAddress.phone}
                                                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="new-address">Address</Label>
                                            <Input
                                                id="new-address"
                                                value={newAddress.address}
                                                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-city">City</Label>
                                            <Input
                                                id="new-city"
                                                value={newAddress.city}
                                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-state">State</Label>
                                            <Input
                                                id="new-state"
                                                value={newAddress.state}
                                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-pincode">Pincode</Label>
                                            <Input
                                                id="new-pincode"
                                                value={newAddress.pincode}
                                                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                id="new-default"
                                                className="mr-2"
                                                checked={newAddress.isDefault}
                                                onChange={(e) =>
                                                    setNewAddress({
                                                        ...newAddress,
                                                        isDefault: e.target.checked,
                                                    })
                                                }
                                            />
                                            <Label htmlFor="new-default">Set as default address</Label>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-6">
                                        <Button onClick={handleAddAddress}>Save Address</Button>
                                        <Button variant="outline" onClick={() => setIsAddingAddress(false)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                    {addresses?.map((address) => (
                        <motion.div key={address.id} variants={itemVariants} className="border rounded-lg p-4 relative">
                            {address.isDefault && (
                                <span className="absolute top-4 right-4 md:top-6 md:right-32 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    Default
                                </span>
                            )}
                            <div className="flex flex-col md:flex-row md:justify-between">
                                <div>
                                    <p className="font-medium">{address.name}</p>
                                    <p className="text-gray-600">{address.address}</p>
                                    <p className="text-gray-600">
                                        {address.city}, {address.state} - {address.pincode}
                                    </p>
                                    <p className="text-gray-600 mt-1">Phone: {address.phone}</p>
                                </div>
                                <div className="flex gap-2 mt-4 md:mt-0">
                                    {!address.isDefault && (
                                        <Button variant="outline" size="sm" onClick={() => handleSetDefaultAddress(address.id)}>
                                            Set as Default
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-red-300 text-red-600 hover:bg-red-50"
                                        onClick={() => handleRemoveAddress(address.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </CardContent>
        </Card>
    )
}

export default AddressPage