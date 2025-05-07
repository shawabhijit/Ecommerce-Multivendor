import { z } from 'zod'
import { Button } from '../../../../Components/ui/button'
import { Card, CardContent } from '../../../../Components/ui/card'
import { Input } from '../../../../Components/ui/input'
import { Label } from '../../../../Components/ui/label'
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '../../../../app/Store'
import { updateCustomerProfileInfo } from '../../../../app/customer/CustomerSlice'

const userInfoUpdate = z.object({
    username: z.string().min(3, { message: "First name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    dob: z.string().optional(),
    gender: z.string().min(4, { message: "Invalid gender" })
})

type UserInfoUpdate = z.infer<typeof userInfoUpdate>

const UserInfo = ({ containerVariants, itemVariants, response , refetchProfile }: any) => {

    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UserInfoUpdate>({
        resolver: zodResolver(userInfoUpdate),
        mode: "onChange",
        defaultValues: {
            username: response?.username || "",
            email: response?.email || "",
            phone: response?.phone || "",
            dob: response?.dateOfBirth || "",
            gender: response?.gender || "male"
        }
    })

    // Sync form with latest response
    useEffect(() => {
        if (response) {
            reset({
                username: response?.username || "",
                email: response?.email || "",
                phone: response?.phone || "",
                dob: response?.dob || "",
                gender: response?.gender || "male"
            })
        }
    }, [response, reset])

    const onSubmit = async (data: UserInfoUpdate) => {
        const res = await dispatch(updateCustomerProfileInfo(data))
        console.log("Updated profile response:", res)
        if (res.meta.requestStatus === 'fulfilled') {
            refetchProfile()
            setIsEditing(false)
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <Button
                        variant="outline"
                        onClick={() => {
                            if (isEditing) reset()
                            setIsEditing(!isEditing)
                        }}
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </div>

                {isEditing ? (
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" {...register("username")} />
                                {errors.username && (
                                    <p className="text-sm text-red-500">{errors.username.message}</p>
                                )}
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register("email")} />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" {...register("phone")} />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone.message}</p>
                            )}
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" {...register("dob")} />
                            {errors.dob && (
                                <p className="text-sm text-red-500">{errors.dob.message}</p>
                            )}
                        </motion.div>
                        <motion.div variants={itemVariants} className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <select
                                id="gender"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...register("gender")}
                            >
                                <option value="" disabled>Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="text-sm text-red-500">{errors.gender.message}</p>
                            )}
                        </motion.div>
                        <motion.div variants={itemVariants} className="pt-4">
                            <Button type="submit">Save Changes</Button>
                        </motion.div>
                    </motion.form>
                ) : (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="font-medium">{response?.username}</p>
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{response?.email}</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <p className="text-sm text-gray-500">Phone Number</p>
                            <p className="font-medium">+91 {response?.phone}</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p className="font-medium">{response?.dob}</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <p className="text-sm text-gray-500">Gender</p>
                            <p className="font-medium">{response?.gender || "Male"}</p>
                        </motion.div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    )
}

export default UserInfo
