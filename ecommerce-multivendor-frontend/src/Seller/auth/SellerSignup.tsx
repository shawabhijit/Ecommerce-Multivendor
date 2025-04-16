"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, ShoppingBag, Upload } from "lucide-react"

import { Button } from "../../Components/ui/button"
import { Input } from "../../Components/ui/input"
import { Label } from "../../Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/ui/select"
import { Progress } from "../../Components/ui/progress"
import { ImageUploader } from "../../Components/Pages/ImageUploader/ImageUploader"


export function SellerSignup() {
    const issendOtp = false
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const totalSteps = 4

    const handleImageChange = (file : File) => {
        
    };

    const [formData, setFormData] = useState({
        fullName: "",
        businessName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        businessType: "",
        gstin: "",
        accountNumber: "",
        ifscCode: "",
        locality:"",
        accountHolderName: "",
        panCard: null as File | null,
        aadharCard: null as File | null,
        gstCertificate: null as File | null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({
                ...prev,
                [fieldName]: e.target.files?.[0] || null,
            }))
        }
    }

    const nextStep = () => {
        if (step < totalSteps) {
            setStep(step + 1)
        }
    }

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // In a real app, you would send the form data to your backend
        } catch (err) {
            console.error("Error submitting form:", err)
        } finally {
            setLoading(false)
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seller@example.com"
                                required
                            />
                            {issendOtp && <button type="button" className="absolute top-7 right-2 text-sm z-[100] hover:text-[#3B82F6] font-semibold cursor-pointer">
                                Verify Email
                            </button>}
                        </div>

                        <div className="space-y-2 relative">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                required
                            />
                            { issendOtp && <button type="button" className="absolute top-7 right-2 text-sm z-[100] hover:text-[#3B82F6] font-semibold cursor-pointer">
                                Verify number
                            </button>}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>
                )

            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="flex gap-4">
                            
                            <ImageUploader
                                label="Add Logo"
                                placeholderUrl="/logo-placeholder.png"
                                //onChange={(file) => handleImageChange("logo", file)}
                            />
                            <ImageUploader
                                label="Add Banner"
                                placeholderUrl="/banner-placeholder.jpg"
                                //onChange={(file) => handleImageChange("banner", file)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Business Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 relative">
                                <Label htmlFor="email">Business Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="seller@example.com"
                                    required
                                />
                                {issendOtp && <button type="button" className="absolute top-7 right-2 text-sm z-[100] hover:text-[#3B82F6] font-semibold cursor-pointer">
                                    Verify Email
                                </button>}
                            </div>

                            <div className="space-y-2 relative">
                                <Label htmlFor="phone">Business Mobile</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                    required
                                />
                                {issendOtp && <button type="button" className="absolute top-7 right-2 text-sm z-[100] hover:text-[#3B82F6] font-semibold cursor-pointer">
                                    Verify number
                                </button>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Business Address</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="123 Main St"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="New York"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="NY"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input
                                    id="zipCode"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    placeholder="10001"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="businessType">Business Type</Label>
                                <Select
                                    onValueChange={(value) => handleSelectChange("businessType", value)}
                                    value={formData.businessType}
                                >
                                    <SelectTrigger id="businessType">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="individual">Individual</SelectItem>
                                        <SelectItem value="partnership">Partnership</SelectItem>
                                        <SelectItem value="llc">LLC</SelectItem>
                                        <SelectItem value="corporation">Corporation</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gstin">GSTIN (optional)</Label>
                            <Input
                                id="gstin"
                                name="gstin"
                                value={formData.gstin}
                                onChange={handleChange}
                                placeholder="22AAAAA0000A1Z5"
                            />
                        </div>
                    </motion.div>
                )

            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="accountNumber">Bank Account Number</Label>
                            <Input
                                id="accountNumber"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                placeholder="000123456789"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="ifscCode">IFSC Code</Label>
                                <Input
                                    id="ifscCode"
                                    name="ifscCode"
                                    value={formData.ifscCode}
                                    onChange={handleChange}
                                    placeholder="ABCD0001234"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                                <Input
                                    id="accountHolderName"
                                    name="accountHolderName"
                                    value={formData.accountHolderName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Document Upload</Label>
                            <p className="text-sm text-gray-500 mb-2">Please upload the following documents for verification</p>

                            <div className="space-y-3">
                                <div className="border rounded-lg p-3 bg-gray-50">
                                    <Label htmlFor="panCard" className="text-sm font-medium">
                                        PAN Card
                                    </Label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Input
                                            id="panCard"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, "panCard")}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => document.getElementById("panCard")?.click()}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload size={16} />
                                            {formData.panCard ? "Change File" : "Upload File"}
                                        </Button>
                                        {formData.panCard && (
                                            <span className="text-sm text-green-600 flex items-center gap-1">
                                                <CheckCircle size={14} /> {formData.panCard.name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="border rounded-lg p-3 bg-gray-50">
                                    <Label htmlFor="gstCertificate" className="text-sm font-medium">
                                        GST Certificate (if applicable)
                                    </Label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Input
                                            id="gstCertificate"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, "gstCertificate")}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => document.getElementById("gstCertificate")?.click()}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload size={16} />
                                            {formData.gstCertificate ? "Change File" : "Upload File"}
                                        </Button>
                                        {formData.gstCertificate && (
                                            <span className="text-sm text-green-600 flex items-center gap-1">
                                                <CheckCircle size={14} /> {formData.gstCertificate.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
            case 4 : 
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Business Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 relative">
                                <Label htmlFor="locality">Locality</Label>
                                <Input
                                    id="locality"
                                    name="locality"
                                    value={formData.locality}
                                    onChange={handleChange}
                                    placeholder="add your locality"
                                    required
                                />
                            </div>

                            <div className="space-y-2 relative">
                                <Label htmlFor="phone">Business Mobile</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                    required
                                />
                                {issendOtp && <button type="button" className="absolute top-7 right-2 text-sm z-[100] hover:text-[#3B82F6] font-semibold cursor-pointer">
                                    Verify number
                                </button>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Business Address</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="123 Main St"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="New York"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="NY"
                                    required
                                />
                            </div>
                        </div>

                        
                        <div className="space-y-2">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input
                                id="zipCode"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                placeholder="10001"
                                required
                            />
                        </div>
                    </motion.div>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-4 flex-col relative overflow-auto ">
            <div className="mb-10 w-[60%] absolute top-5">
                <Progress value={(step / totalSteps) * 100} className="h-2" />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span className={step >= 1 ? "text-primary font-medium" : ""}>Account</span>
                    <span className={step >= 2 ? "text-primary font-medium" : ""}>Business</span>
                    <span className={step >= 3 ? "text-primary font-medium" : ""}>Verification</span>
                    <span className={step >= 3 ? "text-primary font-medium" : ""}>Picup Address</span>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl absolute top-20"
            >
                {/* <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                            <div className="bg-primary/10 p-3 rounded-full">
                                <ShoppingBag className="h-8 w-8 text-primary" />
                            </div>
                        </motion.div>
                    </div>
                    <h1 className="text-2xl font-bold">Seller Registration</h1>
                    <p>Create your seller account to start selling on our platform</p>
                </div> */}
                
                <Card className=" w-full">
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

                            <div className="flex justify-between mt-6">
                                {step > 1 ? (
                                    <Button type="button" variant="outline" onClick={prevStep} className="flex items-center gap-2">
                                        <ArrowLeft size={16} /> Back
                                    </Button>
                                ) : (
                                    <Link to="/">
                                        <Button type="button" variant="outline" className="flex items-center gap-2">
                                            <ArrowLeft size={16} /> Login
                                        </Button>
                                    </Link>
                                )}

                                {step < totalSteps ? (
                                    <motion.div whileTap={{ scale: 0.98 }}>
                                        <Button type="button" onClick={nextStep} className="flex items-center gap-2">
                                            Next <ArrowRight size={16} />
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div whileTap={{ scale: 0.98 }}>
                                        <Button type="submit" className="flex items-center gap-2" >
                                            {loading ? "Creating Account..." : "Create Account"}
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Already have a seller account?{" "}
                            <Link to="/" className="text-primary font-medium hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
