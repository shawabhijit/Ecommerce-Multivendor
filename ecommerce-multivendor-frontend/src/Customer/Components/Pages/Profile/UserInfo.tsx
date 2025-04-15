import { Button } from '../../../../Components/ui/button'
import { Card, CardContent } from '../../../../Components/ui/card'
import { Input } from '../../../../Components/ui/input'
import { Label } from '../../../../Components/ui/label'
import { motion } from "framer-motion"
import { useState } from 'react'

const UserInfo = ({ containerVariants, itemVariants }: any) => {

    const [isEditing, setIsEditing] = useState(false)


    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </div>

                {isEditing ? (
                    <motion.form variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" defaultValue="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" defaultValue="Doe" />
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue="+91 98765 43210" />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" defaultValue="1990-01-01" />
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <select
                                id="gender"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue="male"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </motion.div>
                        <motion.div variants={itemVariants} className="pt-4">
                            <Button type="button" onClick={() => setIsEditing(false)}>
                                Save Changes
                            </Button>
                        </motion.div>
                    </motion.form>
                ) : (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">First Name</p>
                                <p className="font-medium">John</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Last Name</p>
                                <p className="font-medium">Doe</p>
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">john.doe@example.com</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <p className="text-sm text-gray-500">Phone Number</p>
                            <p className="font-medium">+91 98765 43210</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p className="font-medium">01 Jan 1990</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <p className="text-sm text-gray-500">Gender</p>
                            <p className="font-medium">Male</p>
                        </motion.div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    )
}

export default UserInfo