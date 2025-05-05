"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
    Check,
    CreditCard,
    Edit,
    Globe,
    Info,
    Save,
    Store,
    X,
    ShoppingCart,
    Package,
} from "lucide-react"
import { Badge } from "../../Components/ui/badge"
import { Alert, AlertDescription } from "../../Components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/ui/card"
import { Button } from "../../Components/ui/button"
import { Label } from "../../Components/ui/label"
import { Input } from "../../Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/ui/select"
import { Textarea } from "../../Components/ui/textarea"
import { Separator } from "../../Components/ui/separator"
import { Switch } from "../../Components/ui/switch"
import { sellerData } from "../Data/api"
import SellerBusinessInfo from "./Info/SellerBusinessInfo"
import SellerPersonalInfo from "./Info/SellerProfileInfo"
import SellerSecurityInfo from "./Info/SellerSecurityInfo"
import SellerNotification from "./Info/SellerNotification"


// Mock seller data


export function SellerProfile() {
    const [seller, setSeller] = useState(sellerData)
    const [activeTab, setActiveTab] = useState("personal")
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({})
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const fileInputRef = useRef<HTMLInputElement>(null)
    // const bannerInputRef = useRef<HTMLInputElement>(null)
    // const logoInputRef = useRef<HTMLInputElement>(null)

    const handleEdit = (section: string) => {
        setIsEditing((prev) => ({ ...prev, [section]: true }))
    }

    const handleCancel = (section: string) => {
        setIsEditing((prev) => ({ ...prev, [section]: false }))
        // Reset form errors for this section
        const newErrors = { ...formErrors }
        Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(section)) {
                delete newErrors[key]
            }
        })
        setFormErrors(newErrors)
    }

    const handleSave = (section: string) => {
        // Simulate API call
        setTimeout(() => {
            setIsEditing((prev) => ({ ...prev, [section]: false }))
            setSaveSuccess(`${section} information updated successfully!`)

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSaveSuccess(null)
            }, 3000)
        }, 800)
    }

    const handleInputChange = (section: string, field: string, value: string) => {
        setSeller((prev) => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof prev],
                [field]: value,
            },
        }))
    }

    const handleNestedInputChange = (section: string, nestedSection: string, field: string, value: string) => {
        setSeller((prev) => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof prev],
                [nestedSection]: {
                    ...prev[section as keyof typeof prev][nestedSection as any],
                    [field]: value,
                },
            },
        }))
    }

    const handleSwitchChange = (section: string, field: string, checked: boolean) => {
        setSeller((prev) => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof prev],
                [field]: checked,
            },
        }))
    }

    const handleNestedSwitchChange = (section: string, nestedSection: string, field: string, checked: boolean) => {
        setSeller((prev) => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof prev],
                [nestedSection]: {
                    ...prev[section as keyof typeof prev][nestedSection as any],
                    [field]: checked,
                },
            },
        }))
    }

    return (
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Seller Profile</h1>
                    <p className="text-gray-500">Manage your personal and business information</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        Verified Seller
                    </Badge>
                </div>
            </div>

            {saveSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6"
                >
                    <Alert className="bg-green-50 text-green-700 border-green-200">
                        <Check className="h-4 w-4" />
                        <AlertDescription>{saveSuccess}</AlertDescription>
                    </Alert>
                </motion.div>
            )}

            <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="business">Business</TabsTrigger>
                    <TabsTrigger value="banking">Banking</TabsTrigger>
                    <TabsTrigger value="store">Store</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                {/* Personal Information Tab */}
                <SellerPersonalInfo
                    handleInputChange={handleInputChange}
                    handleCancel={handleCancel}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    isEditing={isEditing}
                />

                {/* Business Information Tab */}
                <SellerBusinessInfo
                    handleInputChange={handleInputChange}
                    handleNestedInputChange={handleNestedInputChange}
                    handleCancel={handleCancel}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    isEditing={isEditing}
                />

                {/* Banking Information Tab */}
                <TabsContent value="banking">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Banking Information</CardTitle>
                                <CardDescription>Manage your payout details</CardDescription>
                            </div>
                            {!isEditing.banking ? (
                                <Button variant="outline" size="sm" onClick={() => handleEdit("banking")}>
                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleCancel("banking")}>
                                        <X className="h-4 w-4 mr-2" /> Cancel
                                    </Button>
                                    <Button size="sm" onClick={() => handleSave("banking")}>
                                        <Save className="h-4 w-4 mr-2" /> Save
                                    </Button>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                                <div className="flex items-start">
                                    <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-blue-700 font-medium">Your banking information is secure</p>
                                        <p className="text-sm text-blue-600">
                                            We use industry-standard encryption to protect your sensitive financial information.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="accountName">Account Holder Name</Label>
                                    <Input
                                        id="accountName"
                                        value={seller.bankDetails.accountName}
                                        onChange={(e) => handleInputChange("bankDetails", "accountName", e.target.value)}
                                        disabled={!isEditing.banking}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bankName">Bank Name</Label>
                                    <Input
                                        id="bankName"
                                        value={seller.bankDetails.bankName}
                                        onChange={(e) => handleInputChange("bankDetails", "bankName", e.target.value)}
                                        disabled={!isEditing.banking}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="accountNumber">Account Number</Label>
                                    <Input
                                        id="accountNumber"
                                        value={seller.bankDetails.accountNumber}
                                        onChange={(e) => handleInputChange("bankDetails", "accountNumber", e.target.value)}
                                        disabled={!isEditing.banking}
                                        type={isEditing.banking ? "text" : "password"}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ifscCode">IFSC Code</Label>
                                    <Input
                                        id="ifscCode"
                                        value={seller.bankDetails.ifscCode}
                                        onChange={(e) => handleInputChange("bankDetails", "ifscCode", e.target.value)}
                                        disabled={!isEditing.banking}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="upiid">UPI id (Optional)</Label>
                                <Input
                                    id="upiid"
                                    value={seller.bankDetails.upiid}
                                    onChange={(e) => handleInputChange("bankDetails", "upiid", e.target.value)}
                                    disabled={!isEditing.banking}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Store Settings Tab */}
                <TabsContent value="store">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Store Settings</CardTitle>
                                <CardDescription>Configure your store preferences</CardDescription>
                            </div>
                            {!isEditing.store ? (
                                <Button variant="outline" size="sm" onClick={() => handleEdit("store")}>
                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleCancel("store")}>
                                        <X className="h-4 w-4 mr-2" /> Cancel
                                    </Button>
                                    <Button size="sm" onClick={() => handleSave("store")}>
                                        <Save className="h-4 w-4 mr-2" /> Save
                                    </Button>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Store className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="font-medium">Store Status</p>
                                        <p className="text-sm text-gray-500">Enable or disable your store</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={seller.storeSettings.isActive}
                                    onCheckedChange={(checked) => handleSwitchChange("storeSettings", "isActive", checked)}
                                    disabled={!isEditing.store}
                                />
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-2">
                                <Label htmlFor="storeUrl">Store URL</Label>
                                <div className="flex items-center">
                                    <span className="bg-gray-100 px-3 py-2 rounded-l-md text-gray-500 border border-r-0 border-gray-200">
                                        https://marketplace.com/store/
                                    </span>
                                    <Input
                                        id="storeUrl"
                                        className="rounded-l-none"
                                        value={seller.storeSettings.storeUrl}
                                        onChange={(e) => handleInputChange("storeSettings", "storeUrl", e.target.value)}
                                        disabled={!isEditing.store}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="categories">Store Categories</Label>
                                <Select
                                    value={seller.storeSettings.categories[0]}
                                    onValueChange={(value) => {
                                        setSeller((prev) => ({
                                            ...prev,
                                            storeSettings: {
                                                ...prev.storeSettings,
                                                categories: [value, ...prev.storeSettings.categories.slice(1)],
                                            },
                                        }))
                                    }}
                                    disabled={!isEditing.store}
                                >
                                    <SelectTrigger id="categories">
                                        <SelectValue placeholder="Select primary category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Electronics">Electronics</SelectItem>
                                        <SelectItem value="Clothing">Clothing</SelectItem>
                                        <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                                        <SelectItem value="Beauty">Beauty</SelectItem>
                                        <SelectItem value="Toys">Toys</SelectItem>
                                        <SelectItem value="Sports">Sports</SelectItem>
                                        <SelectItem value="Books">Books</SelectItem>
                                        <SelectItem value="Accessories">Accessories</SelectItem>
                                        <SelectItem value="Smart Home">Smart Home</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {seller.storeSettings.categories.map((category, index) => (
                                        <Badge key={index} variant="secondary" className="px-2 py-1">
                                            {category}
                                            {isEditing.store && index > 0 && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-4 w-4 ml-1 p-0"
                                                    onClick={() => {
                                                        setSeller((prev) => ({
                                                            ...prev,
                                                            storeSettings: {
                                                                ...prev.storeSettings,
                                                                categories: prev.storeSettings.categories.filter((_, i) => i !== index),
                                                            },
                                                        }))
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            )}
                                        </Badge>
                                    ))}
                                    {isEditing.store && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-7"
                                            onClick={() => {
                                                setSeller((prev) => ({
                                                    ...prev,
                                                    storeSettings: {
                                                        ...prev.storeSettings,
                                                        categories: [...prev.storeSettings.categories, "New Category"],
                                                    },
                                                }))
                                            }}
                                        >
                                            + Add
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="returnPolicy">Return Policy</Label>
                                <Textarea
                                    id="returnPolicy"
                                    value={seller.storeSettings.returnPolicy}
                                    onChange={(e) => handleInputChange("storeSettings", "returnPolicy", e.target.value)}
                                    disabled={!isEditing.store}
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Shipping Methods</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {["Standard", "Express", "Next Day", "International"].map((method) => (
                                        <div key={method} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={`shipping-${method}`}
                                                checked={seller.storeSettings.shippingMethods.includes(method)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSeller((prev) => ({
                                                            ...prev,
                                                            storeSettings: {
                                                                ...prev.storeSettings,
                                                                shippingMethods: [...prev.storeSettings.shippingMethods, method],
                                                            },
                                                        }))
                                                    } else {
                                                        setSeller((prev) => ({
                                                            ...prev,
                                                            storeSettings: {
                                                                ...prev.storeSettings,
                                                                shippingMethods: prev.storeSettings.shippingMethods.filter((m) => m !== method),
                                                            },
                                                        }))
                                                    }
                                                }}
                                                disabled={!isEditing.store}
                                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <Label htmlFor={`shipping-${method}`} className="text-sm">
                                                {method}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <SellerSecurityInfo handleSwitchChange={handleSwitchChange} />

                {/* Notifications Tab */}
                <SellerNotification handleNestedSwitchChange={handleNestedSwitchChange} />
            </Tabs>
        </div>
    )
}
