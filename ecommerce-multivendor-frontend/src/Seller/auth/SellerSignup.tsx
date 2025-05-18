"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useForm, FormProvider, useFormContext, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "../../Components/ui/button"
import { Input } from "../../Components/ui/input"
import { Card, CardContent, CardFooter } from "../../Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/ui/select"
import { Progress } from "../../Components/ui/progress"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../Components/ui/form"
import { useAppDispatch, useAppSelecter } from "../../app/Store"
import { sellerSignin } from "../../app/authSlice/sellerAuthSlice"

// Define schema for each step - using schema objects directly without .refine()
const accountSchemaFields = {
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string()
}

const businessSchemaFields = {
    businessName: z.string().min(2, { message: "Business name is required" }),
    businessEmail: z.string().email({ message: "Please enter a valid email" }),
    businessPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
    address: z.string().min(3, { message: "Address is required" }),
    city: z.string().min(2, { message: "City is required" }),
    state: z.string().min(2, { message: "State is required" }),
    zipCode: z.string().min(5, { message: "Zip code is required" }),
    businessType: z.string().min(1, { message: "Please select a business type" }),
    gstin: z.string().optional(),
};


const verificationSchemaFields = {
    accountNumber: z.string().min(1, { message: "Account number is required" }),
    ifscCode: z.string().min(1, { message: "IFSC code is required" }),
    accountHolderName: z.string().min(1, { message: "Account holder name is required" }),
};


const pickupAddressSchemaFields = {
    pickupBusinessName: z.string().min(2, { message: "Business name is required" }),
    locality: z.string().min(2, { message: "Locality is required" }),
    pickupPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
    pickupAddress: z.string().min(3, { message: "Address is required" }),
    pickupCity: z.string().min(2, { message: "City is required" }),
    pickupState: z.string().min(2, { message: "State is required" }),
    pickupZipCode: z.string().min(5, { message: "Zip code is required" })
};


// Combine all schemas for the full form
const formSchema = z.object({
    ...accountSchemaFields,
    ...businessSchemaFields,
    ...verificationSchemaFields,
    ...pickupAddressSchemaFields
});

type FormValues = z.infer<typeof formSchema>;

// Create form field components for each step
const AccountFormFields = () => {
    const { control } = useFormContext<FormValues>();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >
            <FormField
                control={control}
                name="fullName"
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
                control={control}
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
                control={control}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={control}
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

                <FormField
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </motion.div>
    );
};

const BusinessFormFields = () => {
    const { control } = useFormContext<FormValues>();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >
            <FormField
                control={control}
                name="businessName"
                render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Business Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="businessEmail"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Business Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="business@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="businessPhone"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Business Mobile</FormLabel>
                            <FormControl>
                                <Input placeholder="+1 (555) 000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name="address"
                render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Business Address</FormLabel>
                        <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="state"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="zipCode"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                                <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="businessType"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Business Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="individual">Individual</SelectItem>
                                    <SelectItem value="partnership">Partnership</SelectItem>
                                    <SelectItem value="llc">LLC</SelectItem>
                                    <SelectItem value="corporation">Corporation</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name="gstin"
                render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>GSTIN (optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="22AAAAA0000A1Z5" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </motion.div>
    );
};

const VerificationFormFields = () => {
    const { control } = useFormContext<FormValues>();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >
            <FormField
                control={control}
                name="accountNumber"
                render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Bank Account Number</FormLabel>
                        <FormControl>
                            <Input placeholder="000123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="ifscCode"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>IFSC Code</FormLabel>
                            <FormControl>
                                <Input placeholder="ABCD0001234" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="accountHolderName"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Account Holder Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </motion.div>
    );
};

const PickupAddressFormFields = () => {
    const { control } = useFormContext<FormValues>();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >
            <FormField
                control={control}
                name="pickupBusinessName"
                render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Business Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="locality"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Locality</FormLabel>
                            <FormControl>
                                <Input placeholder="Add your locality" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="pickupPhone"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Business Mobile</FormLabel>
                            <FormControl>
                                <Input placeholder="+1 (555) 000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name="pickupAddress"
                render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Business Address</FormLabel>
                        <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="pickupCity"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="pickupState"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name="pickupZipCode"
                render={({ field }) => (
                    <FormItem className="space-y-2">
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                            <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </motion.div>
    );
};

export function SellerSignup() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const totalSteps = 4;

    const seller = useAppSelecter((state) => state.sellers);

    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            businessName: "",
            businessEmail: "",
            businessPhone: "",
            address: "",
            zipCode: "",
            businessType: "",
            gstin: "",
            city: "",
            state: "",
            accountNumber: "",
            accountHolderName: "",
            ifscCode: "",
            pickupBusinessName: "",
            locality: "",
            pickupPhone: "",
            pickupAddress: "",
            pickupCity: "",
            pickupState: "",
            pickupZipCode: ""
        }
    });

    const getFieldsForStep = (stepNumber: number) => {
        switch (stepNumber) {
            case 1:
                return Object.keys(accountSchemaFields);
            case 2:
                return Object.keys(businessSchemaFields);
            case 3:
                return Object.keys(verificationSchemaFields);
            case 4:
                return Object.keys(pickupAddressSchemaFields);
            default:
                return [];
        }
    };

    const validateStep = async (stepNumber: number) => {
        const fields = getFieldsForStep(stepNumber);
        const result = await methods.trigger(fields as any);
        return result;
    };

    const nextStep = async () => {
        // this define that all the filds values are provided or not 
        const isValid = await validateStep(step);

        if (isValid) {
            if (step < totalSteps) {
                setStep(step + 1);
            }
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);

        const isStepOneValid = await methods.trigger(getFieldsForStep(1) as any);
        const isStepTwoValid = await methods.trigger(getFieldsForStep(2) as any);
        const isStepThreeValid = await methods.trigger(getFieldsForStep(3) as any);
        const isStepFourValid = await methods.trigger(getFieldsForStep(4) as any);

        if (!isStepOneValid || !isStepTwoValid || !isStepThreeValid || !isStepFourValid) {
            console.error("Form validation failed");
            setLoading(false);
            return;
        }


        const transformedData = {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            phone: data.phone,
            businessDetails: {
                businessName: data.businessName,
                businessEmail: data.businessEmail,
                businessPhone: data.businessPhone,
                address: data.address,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode,
                businessType: data.businessType,
                gstin: data.gstin,
            },
            bankDetails: {
                accountNumber: data.accountNumber,
                accountHolderName: data.accountHolderName,
                ifscCode: data.ifscCode,
            },
            pickupAddress: {
                pickupBusinessName: data.pickupBusinessName,
                locality: data.locality,
                pickupPhone: data.pickupPhone,
                pickupAddress: data.pickupAddress,
                pickupCity: data.pickupCity,
                pickupState: data.pickupState,
                pickupZipCode: data.pickupZipCode,
            }
        };


        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // console.log("Form submitted successfully:", data);
            // Navigate to next page or show success message
            const response = await dispatch(sellerSignin(transformedData));
            console.log("response: ", response);
            console.log("response payload: ", response.payload);
            console.log("response payload success: ", response.payload?.success);
            console.log("selected selller : ", seller.selectedSeller)
            if (response.payload?.success || seller.selectedSeller) { // Adjust condition based on your API response structure
                navigate("/seller/login");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
        } finally {
            setLoading(false);
        }
    };



    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <AccountFormFields />;
            case 2:
                return <BusinessFormFields />;
            case 3:
                return <VerificationFormFields />;
            case 4:
                return <PickupAddressFormFields />;
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center justify-center px-4 flex-col overflow-y-hidden container min-h-screen">
            <div className="mb-10 w-[60%] absolute top-10">
                <Progress value={(step / totalSteps) * 100} className="h-2" />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span className={step >= 1 ? "text-primary font-medium" : ""}>Account</span>
                    <span className={step >= 2 ? "text-primary font-medium" : ""}>Business</span>
                    <span className={step >= 3 ? "text-primary font-medium" : ""}>Verification</span>
                    <span className={step >= 4 ? "text-primary font-medium" : ""}>Pickup Address</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl absolute top-32"
            >
                <Card className="w-full">
                    <CardContent>
                        <FormProvider {...methods}>
                            <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
                                <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

                                <div className="flex justify-between mt-6">
                                    {step > 1 ? (
                                        <Button type="button" variant="outline" onClick={prevStep} className="flex items-center gap-2">
                                            <ArrowLeft size={16} /> Back
                                        </Button>
                                    ) : (
                                        <Link to="/seller/login">
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
                                            <Button
                                                type="submit"
                                                className="flex items-center gap-2"
                                                disabled={loading}
                                            >
                                                {loading ? "Creating Account..." : "Create Account"}
                                            </Button>
                                        </motion.div>
                                    )}
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Already have a seller account?{" "}
                            <Link to="/seller/login" className="text-primary font-medium hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}