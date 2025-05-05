import React, { useRef, useState } from 'react'
import { Label } from '../../../Components/ui/label'
import { Input } from '../../../Components/ui/input'
import { Button } from '../../../Components/ui/button'
import { Lock, Mail } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../Components/ui/card'
import { TabsContent } from '../../../Components/ui/tabs'
import { sellerData } from '../../Data/api'
import { Switch } from '../../../Components/ui/switch'
import { Separator } from '../../../Components/ui/separator'

const SellerSecurityInfo = ({
    handleSwitchChange
}) => {

    const [seller, setSeller] = useState(sellerData)

    return (
        <TabsContent value="security">
            <Card>
                <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Lock className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="font-medium">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                            </div>
                        </div>
                        <Switch
                            checked={seller.security.twoFactorEnabled}
                            onCheckedChange={(checked) => handleSwitchChange("security", "twoFactorEnabled", checked)}
                        />
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-sm font-medium mb-3">Change Password</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                            <Button>Update Password</Button>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Mail className="h-5 w-5 text-gray-500" />
                            <div>
                                <p className="font-medium">Login Alerts</p>
                                <p className="text-sm text-gray-500">Receive email notifications for new login attempts</p>
                            </div>
                        </div>
                        <Switch
                            checked={seller.security.loginAlerts}
                            onCheckedChange={(checked) => handleSwitchChange("security", "loginAlerts", checked)}
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">
                            Last password change: <span className="font-medium">{seller.security.lastPasswordChange}</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default SellerSecurityInfo