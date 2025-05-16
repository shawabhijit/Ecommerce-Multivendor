"use client"

import { useState, useEffect } from "react"
import {Edit,Info,Save,X,} from "lucide-react"
import { Badge } from "../../Components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/ui/card"
import { Button } from "../../Components/ui/button"
import { Label } from "../../Components/ui/label"
import { Input } from "../../Components/ui/input"
import SellerBusinessInfo from "./Info/SellerBusinessInfo"
import SellerPersonalInfo from "./Info/SellerProfileInfo"
import SellerSecurityInfo from "./Info/SellerSecurityInfo"
import { updateSellerProfile } from "../../app/seller/SellerSlice"
import { useAppDispatch } from "../../app/Store"
import { toast } from "sonner"


export function SellerProfile({ sellerInfo, setSellerInfo }: any) {

    console.log("Seller Profile: ", sellerInfo)

    // Initialize seller state with sellerInfo or empty object to prevent null
    const [seller, setSeller] = useState<any>(sellerInfo || {});
    const [activeTab, setActiveTab] = useState("personal")
    const [isEditing, setIsEditing] = useState<Record<string, boolean>>({})
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const dispatch = useAppDispatch();

    // Update local state when props change
    useEffect(() => {
        if (sellerInfo) {
            setSeller(sellerInfo);
        }
    }, [sellerInfo]);

    const updateSeller = async (updatedSellerInfo: any) => {
        try {
            const res = await dispatch(updateSellerProfile(updatedSellerInfo));
            if (res.meta.requestStatus === "fulfilled") {
                if (setSellerInfo) {
                    setSellerInfo(updatedSellerInfo);
                }
            }
        } catch (error) {
            console.error("Error updating seller profile:", error);
        }
    }

    const handleEdit = (section: string) => {
        const currentData = sellerInfo ? JSON.parse(JSON.stringify(sellerInfo)) : {};
        setSeller(currentData);
        setIsEditing((prev) => ({ ...prev, [section]: true }))
    }

    const handleCancel = (section: string) => {
        setIsEditing((prev) => ({ ...prev, [section]: false }))
        const currentData = sellerInfo ? JSON.parse(JSON.stringify(sellerInfo)) : {};
        setSeller(currentData);
        const newErrors = { ...formErrors }
        Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(section)) {
                delete newErrors[key]
            }
        })
        setFormErrors(newErrors)
    }

    const handleSave = (section: string) => {
        updateSeller(seller);
        setIsEditing((prev) => ({ ...prev, [section]: false }))
        toast.success("Profile updated successfully!")
    }

    const handleInputChange = (section: string | null, field: string, value: string) => {
        setSeller((prev) => {
            const safePrev = prev || {};
            if (section !== null) {
                const sectionData = safePrev[section] || {};
                return {
                    ...safePrev,
                    [section]: {
                        ...sectionData,
                        [field]: value,
                    },
                };
            } else {
                return {
                    ...safePrev,
                    [field]: value,
                };
            }
        });
    };

    const handleSwitchChange = (section: string, field: string, checked: boolean) => {
        setSeller((prev) => {
            const safePrev = prev || {};
            const sectionData = safePrev[section] || {};

            return {
                ...safePrev,
                [section]: {
                    ...sectionData,
                    [field]: checked,
                },
            };
        });
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

            <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="businessDetails">Business</TabsTrigger>
                    <TabsTrigger value="bankDetails">Banking</TabsTrigger>
                    <TabsTrigger value="security">Settings</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                {/* Personal Information Tab */}
                <SellerPersonalInfo
                    sellerInfo={seller} /* Use local state instead of props */
                    setSellerInfo={setSeller}
                    handleInputChange={handleInputChange}
                    handleCancel={handleCancel}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    updateSeller={updateSeller}
                    isEditing={isEditing}
                />

                {/* Business Information Tab */}
                <SellerBusinessInfo
                    sellerInfo={seller} /* Use local state instead of props */
                    handleInputChange={handleInputChange}
                    handleCancel={handleCancel}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    updateSeller={updateSeller}
                    isEditing={isEditing}
                />

                {/* Banking Information Tab */}
                <TabsContent value="bankDetails">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Banking Information</CardTitle>
                                <CardDescription>Manage your payout details</CardDescription>
                            </div>
                            {!isEditing.bankDetails ? (
                                <Button variant="outline" size="sm" onClick={() => handleEdit("bankDetails")}>
                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleCancel("bankDetails")}>
                                        <X className="h-4 w-4 mr-2" /> Cancel
                                    </Button>
                                    <Button size="sm" onClick={() => handleSave("bankDetails")}>
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
                                        value={seller?.bankDetails?.accountHolderName || ""}
                                        onChange={(e) => handleInputChange("bankDetails", "accountHolderName", e.target.value)}
                                        disabled={!isEditing.bankDetails}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="accountNumber">Account Number</Label>
                                    <Input
                                        id="accountNumber"
                                        value={seller?.bankDetails?.accountNumber || ""}
                                        onChange={(e) => handleInputChange("bankDetails", "accountNumber", e.target.value)}
                                        disabled={!isEditing.bankDetails}
                                        type={isEditing.bankDetails ? "text" : "password"}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ifscCode">IFSC Code</Label>
                                    <Input
                                        id="ifscCode"
                                        value={seller?.bankDetails?.ifscCode || ""}
                                        onChange={(e) => handleInputChange("bankDetails", "ifscCode", e.target.value)}
                                        disabled={!isEditing.bankDetails}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="upiid">UPI id (Optional)</Label>
                                <Input
                                    id="upiid"
                                    value={seller?.bankDetails?.upiid || ""}
                                    onChange={(e) => handleInputChange("bankDetails", "upiid", e.target.value)}
                                    disabled={!isEditing.bankDetails}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <SellerSecurityInfo sellerInfo={seller} handleSwitchChange={handleSwitchChange} />

                {/* Notifications Tab */}
                {/* <SellerNotification sellerInfo={seller} handleNestedSwitchChange={handleNestedSwitchChange} /> */}
            </Tabs>
        </div>
    )
}