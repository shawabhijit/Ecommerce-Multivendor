"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../../../Components/ui/button"
import { Input } from "../../../Components/ui/input"
import { Label } from "../../../Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../Components/ui/card"
import { useAppDispatch, useAppSelecter } from "../../../app/Store"
import { loginAdmin } from "../../../app/Admin/AdminSlice"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "password required 6 vlaues.").max(20, "password should be less than 20 characters"),
})

type FormData = z.infer<typeof formSchema>

export function AdminLogin() {
    const { isLoggedIn } = useAppSelecter((state) => state.sellers);
    const navigate = useNavigate();
    // const isLogedin = useAppSelecter((state) => state.sellers.isLoggedIn);
    const [loading, setLoading] = useState(false)

    // Default admin credentials
    const defaultCredentials = {
        email: "hiakri861@gmail.com",
        password: "hiakri@861"
    }

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    //const value = watch("password")

    const fillDefaultCredentials = () => {
        setValue("email", defaultCredentials.email);
        setValue("password", defaultCredentials.password);
    }

    const onSubmit = async (data: FormData) => {
        setLoading(true)
            // Simulate API call
        const res = await dispatch(loginAdmin(data))
        if (res.meta.requestStatus === "fulfilled") {
            setLoading(false)
            navigate("/admin/")
        }
        else {
            const payload = res.payload as any;
            toast.error(payload.message)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            // Redirect to dashboard or appropriate page
            navigate('/seller/');
        }
    }, [isLoggedIn, navigate]);

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
                        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                        <CardDescription>Enter your credentials to access Admin dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2 relative ">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Admin email"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                )}
                                <div className="space-y-2 relative pt-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="password"
                                        {...register("password")}
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                    )}
                                </div>


                            </div>
                            <motion.div whileTap={{ scale: 0.98 }}>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Signing in..." : "Sign In"}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Use Inbuild credentials to login:
                            <span
                                onClick={fillDefaultCredentials}
                                className="pl-2 cursor-pointer text-sm font-semibold hover:text-blue-600 hover:scale-105 inline-block  transition-all duration-200"
                            >
                                Click Me
                            </span>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}