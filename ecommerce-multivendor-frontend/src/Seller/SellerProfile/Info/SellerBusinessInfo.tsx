import React, { useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../Components/ui/select'
import { Label } from '../../../Components/ui/label'
import { Input } from '../../../Components/ui/input'
import { Button } from '../../../Components/ui/button'
import { Camera, Edit, Save, Upload, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../Components/ui/card'
import { TabsContent } from '../../../Components/ui/tabs'
import { Textarea } from '../../../Components/ui/textarea'
import { Separator } from '../../../Components/ui/separator'
import { sellerData } from '../../Data/api'

const SellerBusinessInfo = ({
    handleInputChange , 
    handleNestedInputChange ,
    handleCancel , 
    handleEdit , 
    handleSave,
    isEditing
}) => {

    const [seller, setSeller] = useState(sellerData)
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null)
    
    const logoInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);


    const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0]
                const reader = new FileReader()
    
                reader.onload = (event) => {
                    if (event.target?.result) {
                        setSeller((prev) => ({
                            ...prev,
                            business: {
                                ...prev.business,
                                banner: event.target?.result as string,
                            },
                        }))
                        setSaveSuccess("Store banner updated successfully!")
    
                        setTimeout(() => {
                            setSaveSuccess(null)
                        }, 3000)
                    }
                }
    
                reader.readAsDataURL(file)
            }
        }
    
        const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0]
                const reader = new FileReader()
    
                reader.onload = (event) => {
                    if (event.target?.result) {
                        setSeller((prev) => ({
                            ...prev,
                            business: {
                                ...prev.business,
                                logo: event.target?.result as string,
                            },
                        }))
                        setSaveSuccess("Store logo updated successfully!")
    
                        setTimeout(() => {
                            setSaveSuccess(null)
                        }, 3000)
                    }
                }
    
                reader.readAsDataURL(file)
            }
        }


    return (
        <TabsContent value="business">
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
                                    src={seller.business.banner || "/placeholder.svg"}
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
                                        src={seller.business.logo || "/placeholder.svg"}
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
                        {!isEditing.business ? (
                            <Button variant="outline" size="sm" onClick={() => handleEdit("business")}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleCancel("business")}>
                                    <X className="h-4 w-4 mr-2" /> Cancel
                                </Button>
                                <Button size="sm" onClick={() => handleSave("business")}>
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
                                    value={seller.business.name}
                                    onChange={(e) => handleInputChange("business", "name", e.target.value)}
                                    disabled={!isEditing.business}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="businessType">Business Type</Label>
                                <Select
                                    value={seller.business.type}
                                    onValueChange={(value) => handleInputChange("business", "type", value)}
                                    disabled={!isEditing.business}
                                >
                                    <SelectTrigger id="businessType">
                                        <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Individual">Individual</SelectItem>
                                        <SelectItem value="LLC">LLC</SelectItem>
                                        <SelectItem value="Corporation">Corporation</SelectItem>
                                        <SelectItem value="Partnership">Partnership</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="gstin">GSTIN</Label>
                                <Input
                                    id="gstin"
                                    value={seller.business.gstin}
                                    onChange={(e) => handleInputChange("business", "gstin", e.target.value)}
                                    disabled={!isEditing.business}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pan">PAN</Label>
                                <Input
                                    id="pan"
                                    value={seller.business.pan}
                                    onChange={(e) => handleInputChange("business", "pan", e.target.value)}
                                    disabled={!isEditing.business}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Business Description</Label>
                            <Textarea
                                id="description"
                                value={seller.business.description}
                                onChange={(e) => handleInputChange("business", "description", e.target.value)}
                                disabled={!isEditing.business}
                                rows={4}
                            />
                        </div>

                        <Separator className="my-4" />

                        <div>
                            <h3 className="text-sm font-medium mb-3">Business Address</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="street">Street Address</Label>
                                    <Input
                                        id="street"
                                        value={seller.business.address.street}
                                        onChange={(e) => handleNestedInputChange("business", "address", "street", e.target.value)}
                                        disabled={!isEditing.business}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        value={seller.business.address.city}
                                        onChange={(e) => handleNestedInputChange("business", "address", "city", e.target.value)}
                                        disabled={!isEditing.business}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="state">State/Province</Label>
                                    <Input
                                        id="state"
                                        value={seller.business.address.state}
                                        onChange={(e) => handleNestedInputChange("business", "address", "state", e.target.value)}
                                        disabled={!isEditing.business}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                                    <Input
                                        id="zipCode"
                                        value={seller.business.address.zipCode}
                                        onChange={(e) => handleNestedInputChange("business", "address", "zipCode", e.target.value)}
                                        disabled={!isEditing.business}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Select
                                        value={seller.business.address.country}
                                        onValueChange={(value) => handleNestedInputChange("business", "address", "country", value)}
                                        disabled={!isEditing.business}
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