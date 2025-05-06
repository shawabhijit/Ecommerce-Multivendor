import { useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../Components/ui/card'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../../../../Components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { useAppDispatch } from '../../../../app/Store'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../Components/ui/form'
import { Input } from '../../../../Components/ui/input'
import { sendLoginOtp } from '../../../../app/authSlice/AuthSlice'
import { InputOTP, InputOTPSlot } from '../../../../Components/ui/input-otp'
import { CustomerSignin } from '../../../../app/authSlice/CustomerAuthSlice'


const accountSchemaFields = z.object({
    username: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    otp: z.string().min(6, "Opt required 6 vlaues."),
})

type signupSchema = z.infer<typeof accountSchemaFields>

const CustomerSignup = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const methods = useForm<signupSchema>({
        resolver: zodResolver(accountSchemaFields),
        mode: "onChange",
        defaultValues: {
            username: "",
            email: "",
            password: "",
            phone: "",
            otp: "",
        }
    });
    const value = methods.watch("otp")

    const OtpHandler = () => {
        setIsEmailSent(true);
        const email = methods.getValues("email");
        console.log("email: ", email)
        dispatch(sendLoginOtp({ email }))
    }

    const onSubmit: SubmitHandler<signupSchema> = async (data) => {
        setLoading(true);

        console.log("Form data:", data);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Form submitted successfully:", data);
            //Navigate to next page or show success message
            const response = await dispatch(CustomerSignin(data)).unwrap();
            console.log("response: ", response);
            // if (response.payload?.success || customer.selectedCustomer) { 
            // }
            navigate("/login");
        } catch (err) {
            console.error("Error submitting form:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center flex-col overflow-hidden container md:h-[100vh] min-h-screen px-4 mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="md:w-[400px] w-full max-w-2xl absolute top-10"
            >
                <Card className="w-full sm:min-h-screen md:min-h-[500px]">
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
                        <CardTitle className="text-2xl font-bold"> Login or Create Account</CardTitle>
                        <CardDescription>Log in to personalize your experience and access exclusive features.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormProvider {...methods}>
                            <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>

                                {
                                    isEmailSent ? (
                                        <div className="w-full flex flex-col justify-center items-center">
                                            <InputOTP
                                                maxLength={6}
                                                className="gap-2"
                                                value={value}
                                                onChange={(value) => methods.setValue("otp", value)}
                                            >
                                                {[...Array(6)].map((_, i) => (
                                                    <InputOTPSlot
                                                        key={i}
                                                        index={i}
                                                        className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl font-semibold transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/50 bg-white shadow-sm"
                                                    />
                                                ))}
                                            </InputOTP>
                                            {methods.formState.errors.otp && (
                                                <p className="text-sm text-red-500 mt-1">{methods.formState.errors.otp.message}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className='space-y-4'>
                                            <FormField
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Full Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2 relative">
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="seller@example.com" type="email" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2 relative">
                                                        <FormLabel>Phone</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+91 10-digits number" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel>Password</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="••••••••" type="password" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )
                                }

                                <div className="flex justify-between mt-6">
                                    <Link to="/login">
                                        <Button type="button" variant="outline" className="flex items-center gap-2">
                                            <ArrowLeft size={16} /> Login
                                        </Button>
                                    </Link>

                                    <motion.div whileTap={{ scale: 0.98 }}>
                                        {
                                            !isEmailSent ? (
                                                <Button
                                                    type="button"
                                                    className="flex items-center gap-2"
                                                    onClick={() => OtpHandler()}
                                                >
                                                    Varify Email
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    className="flex items-center gap-2"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Creating Account..." : "Create Account"}
                                                </Button>
                                            )
                                        }
                                    </motion.div>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Already have a seller account?{" "}
                            <Link to="/login" className="text-primary font-medium hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div >
    )
}

export default CustomerSignup