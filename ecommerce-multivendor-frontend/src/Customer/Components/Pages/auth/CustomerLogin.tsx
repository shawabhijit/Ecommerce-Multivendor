import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '../../../../Components/ui/card'
import { ShoppingBag } from 'lucide-react'
import { Label } from '../../../../Components/ui/label'
import { Input } from '../../../../Components/ui/input'
import { InputOTP, InputOTPSlot } from '../../../../Components/ui/input-otp'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../../Components/ui/button'
import { useAppDispatch } from '../../../../app/Store'
import { sendLoginOtp } from '../../../../app/authSlice/AuthSlice'
import { fetchCustomerByEmail } from '../../../../app/customer/CustomerSlice'
import { CustomerAuthLogin } from '../../../../app/authSlice/CustomerAuthSlice'

const formSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    otp: z.string().optional(), // OTP will be required only after it's sent
})

type FormData = z.infer<typeof formSchema>

const CustomerLogin = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [sendOtp, setSendOtp] = useState(false)

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

    const otpValue = watch("otp")

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        setError("")

        const email = data.email
        const otp = data.otp || ""

        try {
            const customer = await dispatch(fetchCustomerByEmail(email))
            const customerExists = customer.payload

            if (!customerExists) {
                navigate("/signup")
                return
            }

            if (!sendOtp) {
                await dispatch(sendLoginOtp({ email }))
                setSendOtp(true)
                setError("OTP sent to your email. Please enter it to continue.")
                return
            }

            if (otp.length < 6) {
                setError("Please enter a valid 6-digit OTP.")
                return
            }

            await new Promise((resolve) => setTimeout(resolve, 1500))
            const res = await dispatch(CustomerAuthLogin({email,otp}))
            console.log('response: ', res)
            
            // Reset and navigate
            setValue("email", "")
            setValue("otp", "")
            setSendOtp(false)
            navigate("/")

        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center px-4 h-screen">
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
                        <CardTitle className="text-2xl font-bold">Login or Create Account</CardTitle>
                        <CardDescription>Log in to personalize your experience and access exclusive features.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2 relative">
                                <Label htmlFor="email" className='ml-1'>Email or Phone</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="customer@example.com"
                                    {...register("email")}
                                    disabled={sendOtp}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {sendOtp && (
                                <div className="w-full flex flex-col justify-center">
                                    <Label htmlFor="otp" className='ml-1'>Enter OTP</Label>
                                    <InputOTP
                                        maxLength={6}
                                        className="gap-2"
                                        value={otpValue}
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
                                <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                                    {loading ? "Processing..." : sendOtp ? "Verify & Continue" : "Continue"}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="text-primary font-medium hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}

export default CustomerLogin
