import React, { useState } from 'react'
import { TabsContent } from '../../../Components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../Components/ui/card'
import { Label } from '../../../Components/ui/label'
import { CreditCard, Globe, Info, Package, ShoppingCart } from 'lucide-react'
import { Switch } from '../../../Components/ui/switch'
import { Separator } from '../../../Components/ui/separator'

const SellerNotification = (
    {
        sellerInfo,
        handleNestedSwitchChange
    }
) => {

    const [seller, setSeller] = useState(sellerInfo)



    return (
        <TabsContent value="notifications">
            <Card>
                <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium mb-3">Email Notifications</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-orders" className="flex items-center space-x-2">
                                    <ShoppingCart className="h-4 w-4 text-gray-500" />
                                    <span>Order Updates</span>
                                </Label>
                                <Switch
                                    id="email-orders"
                                    checked={seller.notifications.email.orders}
                                    onCheckedChange={(checked) =>
                                        handleNestedSwitchChange("notifications", "email", "orders", checked)
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-inventory" className="flex items-center space-x-2">
                                    <Package className="h-4 w-4 text-gray-500" />
                                    <span>Inventory Alerts</span>
                                </Label>
                                <Switch
                                    id="email-inventory"
                                    checked={seller.notifications.email.inventory}
                                    onCheckedChange={(checked) =>
                                        handleNestedSwitchChange("notifications", "email", "inventory", checked)
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-promotions" className="flex items-center space-x-2">
                                    <Globe className="h-4 w-4 text-gray-500" />
                                    <span>Promotions & Marketing</span>
                                </Label>
                                <Switch
                                    id="email-promotions"
                                    checked={seller.notifications.email.promotions}
                                    onCheckedChange={(checked) =>
                                        handleNestedSwitchChange("notifications", "email", "promotions", checked)
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-payouts" className="flex items-center space-x-2">
                                    <CreditCard className="h-4 w-4 text-gray-500" />
                                    <span>Payout Updates</span>
                                </Label>
                                <Switch
                                    id="email-payouts"
                                    checked={seller.notifications.email.payouts}
                                    onCheckedChange={(checked) =>
                                        handleNestedSwitchChange("notifications", "email", "payouts", checked)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-sm font-medium mb-3">Push Notifications</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="push-orders" className="flex items-center space-x-2">
                                    <ShoppingCart className="h-4 w-4 text-gray-500" />
                                    <span>Order Updates</span>
                                </Label>
                                <Switch
                                    id="push-orders"
                                    checked={seller.notifications.push.orders}
                                    onCheckedChange={(checked) =>
                                        handleNestedSwitchChange("notifications", "push", "orders", checked)
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="push-inventory" className="flex items-center space-x-2">
                                    <Package className="h-4 w-4 text-gray-500" />
                                    <span>Inventory Alerts</span>
                                </Label>
                                <Switch
                                    id="push-inventory"
                                    checked={seller.notifications.push.inventory}
                                    onCheckedChange={(checked) =>
                                        handleNestedSwitchChange("notifications", "push", "inventory", checked)
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="push-promotions" className="flex items-center space-x-2">
                                    <Globe className="h-4 w-4 text-gray-500" />
                                    <span>Promotions & Marketing</span>
                                </Label>
                                <Switch
                                    id="push-promotions"
                                    checked={seller.notifications.push.promotions}
                                    onCheckedChange={(checked) =>
                                        handleNestedSwitchChange("notifications", "push", "promotions", checked)
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="push-payouts" className="flex items-center space-x-2">
                                    <CreditCard className="h-4 w-4 text-gray-500" />
                                    <span>Payout Updates</span>
                                </Label>
                                <Switch
                                    id="push-payouts"
                                    checked={seller.notifications.push.payouts}
                                    onCheckedChange={(checked) =>
                                        handleNestedSwitchChange("notifications", "push", "payouts", checked)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-start">
                            <Info className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <p className="text-sm text-gray-500">
                                You can manage your notification preferences at any time. We'll only send you the notifications
                                you've opted into.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default SellerNotification