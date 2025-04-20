"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../../Components/ui/button"
import { Input } from "../../Components/ui/input"
import { Label } from "../../Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../Components/ui/card"
import { InputOTP, InputOTPSlot } from "../../Components/ui/input-otp"
import { useAppDispatch, useAppSelecter} from "../../app/Store"
import { sendLoginOtp, signIn } from "../../app/authSlice/AuthSlice"
import { sellerLogin } from "../../app/authSlice/sellerAuthSlice"

const formSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    otp: z.string().min(6,"Opt required 6 vlaues.") ,
})

type FormData = z.infer<typeof formSchema>

export function SellerLogin() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [sendOtp, setSendOtp] = useState(false)

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            otp: "",
        },
    })

    const value = watch("otp")
    
    const handleSendOtp = () => {
        setSendOtp(true)
        const email = getValues("email")
        dispatch(sendLoginOtp({email}))
    }

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        setError("")

        const email = data.email;
        const otp = data.otp
        console.log(data.email)
        console.log(data.otp) 

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))
            dispatch(sellerLogin({email,otp}))
            
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
            setValue("email", "");
            setValue("otp", "");
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
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2 relative">
                                <Label htmlFor="email">Email or Phone</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="seller@example.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                )}

                                {!sendOtp ? (
                                    <button
                                        onClick={() => handleSendOtp()}
                                        type="button"
                                        className="absolute top-7 right-4 text-sm text-[#10B981] hover:text-[#1D4ED8] hover:scale-[1.01] duration-300 cursor-pointer"
                                    >
                                        Send OTP
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setSendOtp(true)
                                        }}
                                        type="button"
                                        className="absolute top-7 right-4 text-sm text-[#10B981] hover:text-[#1D4ED8] hover:scale-[1.1] duration-300 cursor-pointer"
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>

                            {sendOtp && (
                                <div className="w-full flex flex-col justify-center">
                                    <InputOTP
                                        maxLength={6}
                                        className="gap-2"
                                        value={value}
                                        onChange={(value) => setValue("otp", value)}
                                    >
                                        {[...Array(6)].map((_, i) => (
                                            <InputOTPSlot
                                                key={i}
                                                index={i}
                                                className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl font-semibold transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/50 bg-white shadow-sm"
                                            />
                                        ))}
                                    </InputOTP>
                                    {errors.otp && (
                                        <p className="text-sm text-red-500 mt-1">{errors.otp.message}</p>
                                    )}
                                </div>
                            )}

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
