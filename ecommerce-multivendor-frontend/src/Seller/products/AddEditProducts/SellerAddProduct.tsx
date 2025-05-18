"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Clock, Eye, Plus, Save, Trash2, Upload, X, Info } from "lucide-react"
import { Button } from "../../../Components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../Components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "../../../Components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../Components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../Components/ui/card"
import { Label } from "../../../Components/ui/label"
import { Input } from "../../../Components/ui/input"
import { Textarea } from "../../../Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select"
import { Badge } from "../../../Components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../Components/ui/dialog"
import { Switch } from "../../../Components/ui/switch"
import { useLocation, useNavigate } from "react-router-dom"
import { z } from "zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ProductPreview from "./ProductPreview"
import { uploadToCloudninary } from "../../../util/CloudinarySupport"
import { useAppDispatch } from "../../../app/Store"
import { createProduct, updateProduct } from "../../../app/seller/SellerProductSlice"
import { api } from "../../../config/api"


const productSchema = z.object({
    title: z.string().min(1, "Product title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    mrpPrice: z.coerce.number().positive("MRP price must be positive"),
    sellingPrice: z.coerce.number().positive("Selling price must be positive"),
    discountPrice: z.coerce.number().nonnegative("Discount price cannot be negative").optional(),
    quantity: z.coerce.number().int().nonnegative("Quantity must be a positive integer"),
    images: z.array(z.string()).min(1, "At least one image is required"),
    status: z.string().optional(),
    sku: z.string().optional().nullable(),
    barcode: z.string().optional().nullable(),
    tags: z.array(z.string()),
    numRatings: z.number().int().nonnegative(),

    category: z.object({
        name: z.string().min(1, "Category name is required"),
        categoryId: z.string().optional(),
    }),
    variants: z.array(
        z.object({
            name: z.string().min(1, "Variant name is required"),
            value: z.string().min(1, "Variant value is required")
        })
    ),

    seo: z.object({
        metaTitle: z.string().max(60, "Meta title should be under 60 characters").optional(),
        metaDescription: z.string().max(160, "Meta description should be under 160 characters").optional(),
        keywords: z.string().optional()
    }).optional(),

    shipping: z.object({
        weight: z.coerce.number().positive("Weight must be positive").optional(),
        dimensions: z.object({
            length: z.coerce.number().positive("Length must be positive").optional(),
            width: z.coerce.number().positive("Width must be positive").optional(),
            height: z.coerce.number().positive("Height must be positive").optional()
        }).optional(),
        freeShipping: z.boolean()
    }).optional(),

    ratings: z.object({
        average: z.number().min(0).max(5),
        count: z.number().int().nonnegative()
    }).optional()
});

export type ProductFormValues = z.infer<typeof productSchema>;


const CATEGORIES = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Toys",
    "Sports",
    "Books"
];

// List of variant types
const VARIANT_TYPES = [
    "color",
    "size",
    "material",
    "style",
    "layout"
];


export function AddEditProduct() {

    const dispatch = useAppDispatch();

    const navigae = useNavigate();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    // console.log("Product ID:", id);
    const isEditMode = id && id !== "add";

    const [activeTab, setActiveTab] = useState("basic");
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showPreviewDialog, setShowPreviewDialog] = useState(false);
    const [showHistoryDialog, setShowHistoryDialog] = useState(false);
    const [formChanged, setFormChanged] = useState(false);
    // const [response , setResponse] = useState<any>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    // Initialize form with React Hook Form and Zod resolver
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors, isDirty }
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        mode: "onChange", // This will validate on change
        defaultValues: {
            title: "",
            description: "",
            mrpPrice: 0,
            sellingPrice: 0,
            discountPrice: 0,
            quantity: 0,
            images: [],
            status: "inactive",
            sku: "",
            barcode: "",
            tags: [],
            numRatings: 0,
            category: {
                name: "",
                categoryId: "",
            },
            variants: [
                { name: "", value: "" }
            ],
            seo: {
                metaTitle: "",
                metaDescription: "",
                keywords: ""
            },
            shipping: {
                weight: 0,
                dimensions: {
                    length: 0,
                    width: 0,
                    height: 0
                },
                freeShipping: false
            },
            ratings: {
                average: 0,
                count: 0
            }
        }
    });

    const {
        fields: variantFields,
        append: appendVariant,
        remove: removeVariant
    } = useFieldArray({
        control,
        name: "variants"
    });

    const watchStatus = watch("status");
    const watchTags = watch("tags");

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log("Form errors:", errors);
        }
    }, [errors])

    useEffect(() => {
        if (isDirty) {
            setFormChanged(true);
        }
    }, [isDirty]);

    useEffect(() => {
        if (isEditMode && id) {
            setLoading(true);

            setTimeout( async () => {
                const mockProduct = await api.get(`/products/${id}`).then((response) => response.data);

                // Reset form with fetched data
                reset(mockProduct);

                // Set image previews
                setImagePreviews(mockProduct.images as string[]);

                setLoading(false);
            }, 1000);
        }
    }, [isEditMode, id, reset]);

    // Handle image upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            const uploadedUrls: string[] = [];

            for (const file of newFiles) {
                try {
                    const url = await uploadToCloudninary(file);
                    if (url) {
                        uploadedUrls.push(url);
                    }
                } catch (error) {
                    console.error("Upload failed for image:", file.name, error);
                }
            }

            // Update form value (cloudinary image URLs)
            const currentImages = watch("images") || [];
            setValue("images", [...currentImages, ...uploadedUrls], { shouldDirty: true });

            setImagePreviews(prev => [...prev, ...uploadedUrls]);

            setFormChanged(true);
        }
    };

    const removeImage = (index: number) => {
        const currentImages = watch("images") || [];
        const newImages = [...currentImages];
        newImages.splice(index, 1);
        setValue("images", newImages, { shouldDirty: true });

        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);

        setFormChanged(true);
    };


    const handleTagAdd = (tag: string) => {
        if (tag && !watchTags.includes(tag)) {
            setValue("tags", [...watchTags, tag], { shouldDirty: true });
            setTagInput("");
            setFormChanged(true);
        }
    };

    const handleTagRemove = (tag: string) => {
        setValue(
            "tags",
            watchTags.filter(t => t !== tag),
            { shouldDirty: true }
        );
        setFormChanged(true);
    };

    // Submit form
    const onSubmit = async (data: ProductFormValues) => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log("Form submitted:", data);

            const product = await dispatch(createProduct(data));

            console.log("Product created successfully:", product);

            // setResponse(product);
            setSaveSuccess(true);
            setFormChanged(false);
            

            setTimeout(() => {
                setSaveSuccess(false);
            }, 3000);

            if (!isEditMode) {
                // router.push("/products");
                console.log("Redirecting to products page");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle product deletion
    const handleDelete = async () => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setShowDeleteDialog(false);
            console.log("Product deleted, redirecting to products page");
        } catch (err) {
            console.error("Error deleting product:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateProductHandle = async () => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (id && !isNaN(Number(id)) && isEditMode) {
                const res = dispatch(updateProduct({ request: watch(), id: Number(id) }));

                console.log("Product updated successfully" , res);

                // setResponse(res);
                setSaveSuccess(true);
                setFormChanged(false);
            }
            else {
                onSubmit(watch());
                console.log("Product created successfully");
            }

            setTimeout(() => {
                setSaveSuccess(false);
            }, 3000);
        } catch (err) {
            console.error("Error updating product:", err);
        } finally {
            setLoading(false);
        }
    }

    const revisionHistory = [
        { id: 1, date: "2023-10-15 14:30", user: "John Doe", changes: "Updated product description and price" },
        { id: 2, date: "2023-09-22 10:15", user: "Jane Smith", changes: "Added new product variants" },
        { id: 3, date: "2023-08-05 16:45", user: "John Doe", changes: "Updated product images" },
        { id: 4, date: "2023-07-18 09:20", user: "Admin", changes: "Product created" },
    ];

    return (
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center">
                    <div className="pl-2">
                        <h1 className="text-2xl font-bold">{isEditMode ? "Edit Product" : "Add New Product"}</h1>
                        <p className="text-gray-500">
                            {isEditMode ? "Update your product information" : "Create a new product listing"}
                        </p>
                    </div>
                </div>

                {isEditMode && (
                    <div className="flex items-center gap-2 mt-4 md:mt-0 ">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button className="cursor-pointer" variant="outline" size="sm" onClick={() => setShowHistoryDialog(true)}>
                                        <Clock className="h-4 w-4 mr-1" /> History
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>View revision history</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button className="cursor-pointer" variant="outline" size="sm" onClick={() => setShowPreviewDialog(true)}>
                                        <Eye className="h-4 w-4 mr-1 " /> Preview
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Preview product page</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )}
            </div>

            {saveSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6"
                >
                    <Alert className="bg-green-50 border-green-200">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Success</AlertTitle>
                        <AlertDescription className="text-green-700">
                            Product has been {isEditMode ? "updated" : "created"} successfully.
                        </AlertDescription>
                    </Alert>
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid grid-cols-5 mb-4 w-full">
                                <TabsTrigger className={`${activeTab == "basic" ? "hiakri-dark-bg text-white" : ""}`} value="basic">Basic Info</TabsTrigger>
                                <TabsTrigger className={`${activeTab == "images" ? "hiakri-dark-bg text-white" : ""}`} value="images">Images</TabsTrigger>
                                <TabsTrigger className={`${activeTab == "variants" ? "hiakri-dark-bg text-white" : ""}`} value="variants">Variants</TabsTrigger>
                                <TabsTrigger className={`${activeTab == "inventory" ? "hiakri-dark-bg text-white" : ""}`} value="inventory">Inventory</TabsTrigger>
                                <TabsTrigger className={`${activeTab == "advanced" ? "hiakri-dark-bg text-white" : ""}`} value="advanced">Advanced</TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Basic Information</CardTitle>
                                        <CardDescription>Enter the basic details of your product</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">
                                                Product Title <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="title"
                                                placeholder="e.g. Premium Wireless Headphones"
                                                required
                                                {...register("title")}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">
                                                Description <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Describe your product in detail"
                                                rows={5}
                                                required
                                                {...register("description")}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="price">
                                                    Regular Price (₹) <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="e.g. 9999"
                                                    required
                                                    {...register("mrpPrice")}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="offerPrice">Sale Price (₹) <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="offerPrice"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="e.g. 7999"
                                                    {...register("sellingPrice")}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="offerPrice">Discount (₹)</Label>
                                                <Input
                                                    id="offerPrice"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="e.g. 20 (optional)"
                                                    {...register("discountPrice")}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="category">
                                                    Category <span className="text-red-500">*</span>
                                                </Label>
                                                <Controller
                                                    name="category.name"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            value={field.value}
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                                // Also set categoryId based on selection
                                                                setValue("category.categoryId", `cat-${value.toLowerCase().replace(/\s+/g, '-') + Math.random() * 100}`, { shouldDirty: true });
                                                            }}
                                                        >
                                                            <SelectTrigger id="category">
                                                                <SelectValue placeholder="Select category" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {CATEGORIES.map((category) => (
                                                                    <SelectItem key={category} value={category}>
                                                                        {category}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.category?.name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.category.name.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Tags</Label>
                                                <div className="flex flex-wrap gap-2 border rounded-md p-2 min-h-[42px]">
                                                    {watchTags.map((tag) => (
                                                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                                            {tag}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleTagRemove(tag)}
                                                                className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                    <input
                                                        className="flex-1 min-w-[100px] outline-none text-sm"
                                                        placeholder="Add tag and press Enter"
                                                        value={tagInput}
                                                        onChange={(e) => setTagInput(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" && tagInput.trim()) {
                                                                e.preventDefault();
                                                                handleTagAdd(tagInput.trim());
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500">Press Enter to add a tag</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Controller
                                                name="status"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        id="status"
                                                        checked={field.value === "active"}
                                                        onCheckedChange={(checked) => {
                                                            field.onChange(checked ? "active" : "inactive");
                                                        }}
                                                        className={`${field.value === "active" ? "hiakri-dark-bg" : ""}`}
                                                    />
                                                )}
                                            />
                                            <Label htmlFor="status">Product is {watchStatus === "active" ? "active" : "inactive"}</Label>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="images" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Product Images</CardTitle>
                                        <CardDescription>Upload high-quality images of your product</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {imagePreviews.map((preview, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="relative aspect-square rounded-md overflow-hidden border group"
                                                    >
                                                        <img
                                                            src={preview || "/placeholder.svg"}
                                                            alt={`Product preview ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="icon"
                                                                className="h-8 w-8 rounded-full"
                                                                onClick={() => removeImage(index)}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        {index === 0 && <Badge className="absolute top-2 left-2 bg-primary">Main</Badge>}
                                                    </motion.div>
                                                ))}

                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="aspect-square rounded-md border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                                                    onClick={() => document.getElementById("image-upload")?.click()}
                                                >
                                                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-500">Upload Image</p>
                                                    <input
                                                        id="image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        className="hidden"
                                                        onChange={handleImageUpload}
                                                    />
                                                </motion.div>
                                            </div>

                                            <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
                                                <h4 className="font-medium mb-2">Image Guidelines:</h4>
                                                <ul className="list-disc pl-5 space-y-1">
                                                    <li>Recommended image size: 1000x1000px</li>
                                                    <li>Supported formats: JPG, PNG, WebP</li>
                                                    <li>Maximum file size: 5MB per image</li>
                                                    <li>Use a white background for product images</li>
                                                    <li>First image will be used as the main product image</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="variants" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Product Variants</CardTitle>
                                        <CardDescription>Add variations like size, color, or material</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {variantFields.map((_, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md relative"
                                                >
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`variant-name-${index}`}>Variant Type</Label>
                                                        <Controller
                                                            name={`variants.${index}.name`}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Select
                                                                    value={field.value}
                                                                    onValueChange={field.onChange}
                                                                >
                                                                    <SelectTrigger id={`variant-name-${index}`}>
                                                                        <SelectValue placeholder="Select type" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {VARIANT_TYPES.map((type) => (
                                                                            <SelectItem key={type} value={type}>
                                                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            )}
                                                        />
                                                        {errors.variants?.[index]?.name && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.variants[index].name.message}</p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`variant-values-${index}`}>Values</Label>
                                                        <Controller
                                                            name={`variants.${index}.value`}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Input
                                                                    id={`variant-value-${index}`}
                                                                    {...field}
                                                                    placeholder="e.g. Red, Blue, Green (comma separated)"
                                                                />
                                                            )}
                                                        />
                                                        {errors.variants?.[index]?.value && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.variants[index].value.message}</p>
                                                        )}
                                                    </div>

                                                    {variantFields.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute top-2 right-2 h-6 w-6"
                                                            onClick={() => removeVariant(index)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </motion.div>
                                            ))}

                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => appendVariant({ name: "", value: "" })}
                                                className="w-full flex items-center justify-center gap-2"
                                            >
                                                <Plus className="h-4 w-4" /> Add Variant
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="inventory" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Inventory Information</CardTitle>
                                        <CardDescription>Manage your product inventory details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="stock">
                                                    Stock Quantity <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="stock"
                                                    type="number"
                                                    min="0"
                                                    placeholder="e.g. 100"
                                                    required
                                                    {...register("quantity", { valueAsNumber: true })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                                                <Input
                                                    id="sku"
                                                    placeholder="e.g. WH-PRO-001"
                                                    {...register("sku")}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
                                            <Input
                                                id="barcode"
                                                placeholder="e.g. 8901234567890"
                                                {...register("barcode")}
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium mb-2">Inventory Tracking</h4>
                                            <div className="flexx items-center space-x-2 mb-4">
                                                <Switch id="track-inventory" checked={true} onCheckedChange={() => { }} />
                                                <Label htmlFor="track-inventory">Track inventory for this product</Label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Switch id="continue-selling" checked={false} onCheckedChange={() => { }} />
                                                <Label htmlFor="continue-selling">Continue selling when out of stock</Label>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="advanced" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>SEO Information</CardTitle>
                                        <CardDescription>Optimize your product for search engines</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="seo.metaTitle">Meta Title</Label>
                                            <Input
                                                id="seo.metaTitle"
                                                placeholder="SEO optimized title"
                                                {...register("seo.metaTitle")}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="seo.metaDescription">Meta Description</Label>
                                            <Textarea
                                                id="seo.metaDescription"
                                                placeholder="Brief description for search results"
                                                rows={3}
                                                {...register("seo.metaDescription")}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="seo.keywords">Keywords</Label>
                                            <Input
                                                id="seo.keywords"
                                                placeholder="e.g. wireless, headphones, bluetooth (comma separated)"
                                                {...register("seo.keywords")}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Shipping Information</CardTitle>
                                        <CardDescription>Enter shipping details for your product</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="shipping.weight">Weight (kg)</Label>
                                            <Input
                                                id="shipping.weight"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder="e.g. 0.5"
                                                {...register("shipping.weight")}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Dimensions (cm)</Label>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <Input
                                                        id="length"
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        placeholder="Length"
                                                        {...register("shipping.dimensions.length")}
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        id="width"
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        placeholder="Width"
                                                        {...register("shipping.dimensions.width")}
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        id="height"
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        placeholder="Height"
                                                        {...register("shipping.dimensions.height")}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="shipping.freeShipping"
                                                checked={watch("shipping.freeShipping")}
                                                onCheckedChange={(checked) => {
                                                    setValue("shipping.freeShipping", checked, { shouldDirty: true });
                                                }}
                                            />
                                            <Label htmlFor="shipping.freeShipping">Offer free shipping</Label>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="status-switch">Product Status</Label>
                                        <Switch
                                            id="status-switch"
                                            checked={watch("status") === "active"}
                                            onCheckedChange={(checked) => setValue("status", checked ? "active" : "inactive")}
                                            className={`${watch("status") === "active" ? "hiakri-dark-bg" : ""}`}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {watch("status") === "active"
                                            ? "Your product will be visible to customers"
                                            : "Your product will be hidden from customers"}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Save Product</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button onClick={updateProductHandle} type="submit" className="w-full flex items-center gap-2 hiakri-dark-bg cursor-pointer" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="animate-spin">⏳</span>
                                            {isEditMode ? "Updating..." : "Creating..."}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            {isEditMode ? "Update Product" : "Create Product"}
                                        </>
                                    )}
                                </Button>
                                <Button type="button" variant="outline" className="w-full" onClick={() => navigae("/seller/products")}>
                                    Cancel
                                </Button>
                            </CardContent>
                            {formChanged && (
                                <CardFooter className="pt-0">
                                    <p className="text-xs text-amber-600 flex items-center gap-1">
                                        <Info className="h-3 w-3" /> You have unsaved changes
                                    </p>
                                </CardFooter>
                            )}
                        </Card>

                        {isEditMode && (
                            <Card className="border-red-200">
                                <CardHeader>
                                    <CardTitle className="text-[#F97316]">Danger Zone</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        className="w-full flex items-center gap-2 bg-[#F97316]"
                                        onClick={() => setShowDeleteDialog(true)}
                                    >
                                        <Trash2 className="h-4 w-4" /> Delete Product
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </form>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this product? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" className="bg-blue-700" onClick={handleDelete} disabled={loading}>
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Product Preview Dialog */}
            <ProductPreview id={Number(id)} imagePreviews={imagePreviews} setShowPreviewDialog={setShowPreviewDialog} showPreviewDialog={showPreviewDialog}  />

            {/* Revision History Dialog */}
            <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Revision History</DialogTitle>
                        <DialogDescription>View the history of changes made to this product</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <div className="space-y-4">
                            {revisionHistory.map((revision) => (
                                <div key={revision.id} className="flex gap-4 pb-4 border-b last:border-0">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                        {revision.id}
                                    </div>
                                    <div>
                                        <p className="font-medium">{revision.changes}</p>
                                        <div className="flex gap-2 text-sm text-gray-500 mt-1">
                                            <span>{revision.user}</span>
                                            <span>•</span>
                                            <span>{revision.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
