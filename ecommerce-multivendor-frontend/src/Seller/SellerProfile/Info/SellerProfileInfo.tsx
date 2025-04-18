import React, { useRef, useState } from 'react'
import { Label } from '../../../Components/ui/label'
import { Input } from '../../../Components/ui/input'
import { Button } from '../../../Components/ui/button'
import { Camera, Edit, Save, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../Components/ui/card'
import { TabsContent } from '../../../Components/ui/tabs'
import { sellerData } from '../../Data/api'
import { Avatar, AvatarFallback, AvatarImage } from '../../../Components/ui/avatar'

const SellerPersonalInfo = ({
    handleInputChange,
    handleCancel,
    handleEdit,
    handleSave,
    isEditing
}) => {

    const [seller, setSeller] = useState(sellerData)
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = (event) => {
                if (event.target?.result) {
                    setSeller((prev) => ({
                        ...prev,
                        personal: {
                            ...prev.personal,
                            avatar: event.target?.result as string,
                        },
                    }))
                    setSaveSuccess("Profile picture updated successfully!")

                    setTimeout(() => {
                        setSaveSuccess(null)
                    }, 3000)
                }
            }

            reader.readAsDataURL(file)
        }
    }


    return (
        <TabsContent value="personal">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Manage your personal details</CardDescription>
                            </div>
                            {!isEditing.personal ? (
                                <Button variant="outline" size="sm" onClick={() => handleEdit("personal")}>
                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleCancel("personal")}>
                                        <X className="h-4 w-4 mr-2" /> Cancel
                                    </Button>
                                    <Button size="sm" onClick={() => handleSave("personal")}>
                                        <Save className="h-4 w-4 mr-2" /> Save
                                    </Button>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={seller.personal.firstName}
                                        onChange={(e) => handleInputChange("personal", "firstName", e.target.value)}
                                        disabled={!isEditing.personal}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={seller.personal.lastName}
                                        onChange={(e) => handleInputChange("personal", "lastName", e.target.value)}
                                        disabled={!isEditing.personal}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={seller.personal.email}
                                        onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                                        disabled={!isEditing.personal}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={seller.personal.phone}
                                        onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                                        disabled={!isEditing.personal}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                            <CardDescription>Upload a profile picture</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <Avatar className="h-32 w-32">
                                    <AvatarImage
                                        src={seller.personal.avatar || "/placeholder.svg"}
                                        alt={`${seller.personal.firstName} ${seller.personal.lastName}`}
                                    />
                                    <AvatarFallback>
                                        {seller.personal.firstName.charAt(0)}
                                        {seller.personal.lastName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Camera className="h-4 w-4" />
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarUpload}
                                />
                            </div>
                            <p className="text-sm text-gray-500">Click the camera icon to upload a new photo</p>
                            <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF, max 2MB</p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start border-t pt-4">
                            <p className="text-sm font-medium">Account Details</p>
                            <p className="text-sm text-gray-500">Member since {seller.personal.joinDate}</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </TabsContent>
    )
}

export default SellerPersonalInfo