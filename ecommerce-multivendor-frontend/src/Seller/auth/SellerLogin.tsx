"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, ShoppingBag } from "lucide-react"

import { Button } from "../../Components/ui/button"
import { Input } from "../../Components/ui/input"
import { Label } from "../../Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../Components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../../Components/ui/input-otp"

export function SellerLogin() {
    const router = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [sendOtp, setSendOtp] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        otp: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // In a real app, you would validate credentials with your backend
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md px-8"
            >
                <Card className="w-full">
                    <CardHeader className="space-y-1 text-center">
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
                        <CardTitle className="text-2xl font-bold">Seller Login</CardTitle>
                        <CardDescription>Enter your credentials to access your seller dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2 relative">
                                <Label htmlFor="email">Email or Phone</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="seller@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {
                                    !sendOtp ? <button onClick={() => setSendOtp(true)} type="button" className="absolute top-7 right-4 text-sm text-[#10B981] hover:text-[#1D4ED8] hover:scale-[1.01] duration-300 cursor-pointer">
                                        send otp
                                    </button> : <button onClick={() => setSendOtp(true)} type="button" className="absolute top-7 right-4 text-sm text-[#10B981] hover:text-[#1D4ED8] hover:scale-[1.1] duration-300 cursor-pointer">
                                        Resent otp
                                    </button>
                                }
                            </div>
                            {/* <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div> */}
                            {
                                sendOtp && <div className="w-full flex items-center justify-center">
                                    <InputOTP maxLength={6} className="gap-2">
                                        {[...Array(6)].map((_, i) => (
                                            <InputOTPSlot
                                                key={i}
                                                index={i}
                                                className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl font-semibold transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/50 bg-white shadow-sm"
                                            />
                                        ))}
                                    </InputOTP>
                                </div>
                            }

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.div whileTap={{ scale: 0.98 }}>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Signing in..." : "Sign In"}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have a seller account?{" "}
                            <Link to="/seller/signup" className="text-primary font-medium hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
