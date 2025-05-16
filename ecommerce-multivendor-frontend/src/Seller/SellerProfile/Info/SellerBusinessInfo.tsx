import { useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../Components/ui/select'
import { Label } from '../../../Components/ui/label'
import { Input } from '../../../Components/ui/input'
import { Button } from '../../../Components/ui/button'
import { Camera, Edit, Save, Upload, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../Components/ui/card'
import { TabsContent } from '../../../Components/ui/tabs'
import { Separator } from '../../../Components/ui/separator'
import { uploadToCloudninary } from '../../../util/CloudinarySupport'

const SellerBusinessInfo = ({
    sellerInfo,
    handleInputChange,
    handleCancel,
    handleEdit,
    handleSave,
    updateSeller,
    isEditing
}) => {
    const logoInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    // Local state for managing form data
    const [localBusiness, setLocalBusiness] = useState(sellerInfo?.businessDetails || {});

    // Update local state when parent props change
    useEffect(() => {
        if (sellerInfo?.businessDetails) {
            setLocalBusiness(sellerInfo.businessDetails);
        }
    }, [sellerInfo]);

    // Handle local input changes
    const handleLocalInputChange = (field, value) => {
        setLocalBusiness(prev => ({
            ...prev,
            [field]: value
        }));

        // Also update parent state through the provided handler
        handleInputChange("businessDetails", field, value);
    };

    const handleBannerUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            try {
                const bannerUrl = await uploadToCloudninary(file);
                if (bannerUrl) {
                    // Update local state
                    setLocalBusiness(prev => ({
                        ...prev,
                        banner: bannerUrl
                    }));

                    // Update parent state with the complete updated object
                    const updatedSellerInfo = {
                        ...sellerInfo,
                        businessDetails: {
                            ...sellerInfo?.businessDetails,
                            banner: bannerUrl
                        }
                    };
                    updateSeller(updatedSellerInfo);
                }
            } catch (error) {
                console.error("Error uploading banner:", error);
            }
        }
    };

    const handleLogoUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            try {
                const logoUrl = await uploadToCloudninary(file);
                if (logoUrl) {
                    setLocalBusiness(prev => ({
                        ...prev,
                        logo: logoUrl
                    }));

                    // updating parent state
                    const updatedSellerInfo = {
                        ...sellerInfo,
                        businessDetails: {
                            ...sellerInfo?.businessDetails,
                            logo: logoUrl
                        }
                    };

                    updateSeller(updatedSellerInfo);
                }
            } catch (error) {
                console.error("Error uploading logo:", error);
            }
        }
    };

    return (
        <TabsContent value="businessDetails">
            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Store Branding</CardTitle>
                            <CardDescription>Customize your store's appearance</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label className="mb-2 block">Store Banner</Label>
                            <div className="relative h-[200px] w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                <img
                                    src={localBusiness?.banner || "/placeholder.svg"}
                                    alt="Store Banner"
                                    className="w-full h-full object-cover"
                                />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="absolute bottom-4 right-4"
                                    onClick={() => bannerInputRef.current?.click()}
                                >
                                    <Upload className="h-4 w-4 mr-2" /> Change Banner
                                </Button>
                                <input
                                    ref={bannerInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleBannerUpload}
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Recommended size: 1200 x 300 pixels</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="h-20 w-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                    <img
                                        src={localBusiness?.logo || "/placeholder.svg"}
                                        alt="Store Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="absolute bottom-0 right-0 rounded-full h-6 w-6"
                                    onClick={() => logoInputRef.current?.click()}
                                >
                                    <Camera className="h-3 w-3" />
                                </Button>
                                <input
                                    ref={logoInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleLogoUpload}
                                />
                            </div>
                            <div>
                                <Label className="mb-1 block">Store Logo</Label>
                                <p className="text-xs text-gray-400">Recommended size: 400 x 400 pixels</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Business Information</CardTitle>
                            <CardDescription>Manage your business details</CardDescription>
                        </div>
                        {!isEditing.businessDetails ? (
                            <Button variant="outline" size="sm" onClick={() => handleEdit("businessDetails")}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleCancel("businessDetails")}>
                                    <X className="h-4 w-4 mr-2" /> Cancel
                                </Button>
                                <Button size="sm" onClick={() => handleSave("businessDetails")}>
                                    <Save className="h-4 w-4 mr-2" /> Save
                                </Button>
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="businessName">Business Name</Label>
                                <Input
                                    id="businessName"
                                    value={localBusiness?.businessName || ""}
                                    onChange={(e) => handleLocalInputChange("businessName", e.target.value)}
                                    disabled={!isEditing.businessDetails}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="businessType">Business Type</Label>
                                <Select
                                    value={localBusiness?.businessType}
                                    onValueChange={(value) => handleLocalInputChange("businessType", value)}
                                    disabled={!isEditing.businessDetails}
                                >
                                    <SelectTrigger id="businessType">
                                        <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="individual">Individual</SelectItem>
                                        <SelectItem value="LLC">LLC</SelectItem>
                                        <SelectItem value="Corporation">Corporation</SelectItem>
                                        <SelectItem value="Partnership">Partnership</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="gstin">GSTIN</Label>
                                <Input
                                    id="gstin"
                                    value={localBusiness?.gstin || ""}
                                    onChange={(e) => handleLocalInputChange("gstin", e.target.value)}
                                    disabled={!isEditing.businessDetails}
                                />
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div>
                            <h3 className="text-sm font-medium mb-3">Business Address</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Street Address</Label>
                                    <Input
                                        id="address"
                                        value={localBusiness?.address || ""}
                                        onChange={(e) => handleLocalInputChange("address", e.target.value)}
                                        disabled={!isEditing.businessDetails}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        value={localBusiness?.city || ""}
                                        onChange={(e) => handleLocalInputChange("city", e.target.value)}
                                        disabled={!isEditing.businessDetails}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="state">State/Province</Label>
                                    <Input
                                        id="state"
                                        value={localBusiness?.state || ""}
                                        onChange={(e) => handleLocalInputChange("state", e.target.value)}
                                        disabled={!isEditing.businessDetails}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                                    <Input
                                        id="zipCode"
                                        value={localBusiness?.zipCode || ""}
                                        onChange={(e) => handleLocalInputChange("zipCode", e.target.value)}
                                        disabled={!isEditing.businessDetails}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Select
                                        value={localBusiness?.country || ""}
                                        onValueChange={(value) => handleLocalInputChange("country", value)}
                                        disabled={!isEditing.businessDetails}
                                    >
                                        <SelectTrigger id="country">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="United States">United States</SelectItem>
                                            <SelectItem value="Canada">Canada</SelectItem>
                                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                            <SelectItem value="Australia">Australia</SelectItem>
                                            <SelectItem value="India">India</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
    )
}

export default SellerBusinessInfo