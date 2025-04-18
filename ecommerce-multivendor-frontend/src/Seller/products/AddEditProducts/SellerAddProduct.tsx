"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Clock, Eye, Plus, Save, Trash2, Upload, X, Info } from "lucide-react"
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
import { Separator } from "../../../Components/ui/separator"
import { mockImagePreviews, mockProductData } from "../../Data/api"



export function AddEditProduct({ productId }: { productId?: string }) {
    const isEditMode = !!productId
    const [activeTab, setActiveTab] = useState("basic")
    const [loading, setLoading] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showPreviewDialog, setShowPreviewDialog] = useState(false)
    const [showHistoryDialog, setShowHistoryDialog] = useState(false)
    const [formChanged, setFormChanged] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        price: "",
        offerPrice: "",
        stock: "",
        category: "",
        status: "active",
        images: [] as File[],
        variants: [{ name: "", values: "" }],
        seo: {
            metaTitle: "",
            metaDescription: "",
            keywords: "",
        },
        shipping: {
            weight: "",
            dimensions: {
                length: "",
                width: "",
                height: "",
            },
            freeShipping: false,
        },
        sku: "",
        barcode: "",
        tags: [] as string[],
    })

    // Preview images
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    // Fetch product data in edit mode
    useEffect(() => {
        if (isEditMode && productId && mockProductData[productId as keyof typeof mockProductData]) {
            // Simulate API fetch
            const fetchData = async () => {
                try {
                    // In a real app, you would fetch from an API
                    await new Promise((resolve) => setTimeout(resolve, 500))

                    const productData = mockProductData[productId as keyof typeof mockProductData]
                    setFormData({
                        ...formData,
                        ...productData,
                        tags: productData.tags || [],
                    })

                    // Set image previews
                    if (mockImagePreviews[productId as keyof typeof mockImagePreviews]) {
                        setImagePreviews(mockImagePreviews[productId as keyof typeof mockImagePreviews])
                    }
                } catch (error) {
                    console.error("Error fetching product data:", error)
                }
            }

            fetchData()
        }
    }, [isEditMode, productId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormChanged(true);

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData({
                ...formData,
                [parent]: {
                    ...(formData[parent as keyof typeof formData] as any),
                    [child]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };


    const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormChanged(true)

        setFormData({
            ...formData,
            shipping: {
                ...formData.shipping,
                dimensions: {
                    ...formData.shipping.dimensions,
                    [name]: value,
                },
            },
        })
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormChanged(true)

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSwitchChange = (name: string, checked: boolean) => {
        setFormChanged(true)

        if (name.includes(".")) {
            const [parent, child] = name.split(".")
            setFormData({
                ...formData,
                [parent]: {
                    [child]: checked,
                },
            })
        } else {
            setFormData({
                ...formData,
                [name]: checked,
            })
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormChanged(true)

            const newFiles = Array.from(e.target.files)
            setFormData({
                ...formData,
                images: [...formData.images, ...newFiles],
            })

            // Create preview URLs
            const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
            setImagePreviews([...imagePreviews, ...newPreviews])
        }
    }

    const removeImage = (index: number) => {
        setFormChanged(true)

        const newImages = [...formData.images]
        newImages.splice(index, 1)

        const newPreviews = [...imagePreviews]
        if (newPreviews[index].startsWith("blob:")) {
            URL.revokeObjectURL(newPreviews[index])
        }
        newPreviews.splice(index, 1)

        setFormData({
            ...formData,
            images: newImages,
        })
        setImagePreviews(newPreviews)
    }

    const addVariant = () => {
        setFormChanged(true)

        setFormData({
            ...formData,
            variants: [...formData.variants, { name: "", values: "" }],
        })
    }

    const removeVariant = (index: number) => {
        setFormChanged(true)

        const newVariants = [...formData.variants]
        newVariants.splice(index, 1)
        setFormData({
            ...formData,
            variants: newVariants,
        })
    }

    const handleVariantChange = (index: number, field: string, value: string) => {
        setFormChanged(true)

        const newVariants = [...formData.variants]
        newVariants[index] = {
            ...newVariants[index],
            [field]: value,
        }
        setFormData({
            ...formData,
            variants: newVariants,
        })
    }

    const handleTagAdd = (tag: string) => {
        if (!formData.tags.includes(tag)) {
            setFormChanged(true)
            setFormData({
                ...formData,
                tags: [...formData.tags, tag],
            })
        }
    }

    const handleTagRemove = (tag: string) => {
        setFormChanged(true)
        setFormData({
            ...formData,
            tags: formData.tags.filter((t) => t !== tag),
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // In a real app, you would send the form data to your backend
            console.log("Form submitted:", formData)

            // Show success message
            setSaveSuccess(true)
            setFormChanged(false)

            // Hide success message after 3 seconds
            setTimeout(() => {
                setSaveSuccess(false)
            }, 3000)

            // If not in edit mode, redirect to products page
            if (!isEditMode) {
                //routing
            }
        } catch (err) {
            console.error("Error submitting form:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        setLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setShowDeleteDialog(false)
            // routing
        } catch (err) {
            console.error("Error deleting product:", err)
        } finally {
            setLoading(false)
        }
    }

    // Mock revision history data
    const revisionHistory = [
        { id: 1, date: "2023-10-15 14:30", user: "John Doe", changes: "Updated product description and price" },
        { id: 2, date: "2023-09-22 10:15", user: "Jane Smith", changes: "Added new product variants" },
        { id: 3, date: "2023-08-05 16:45", user: "John Doe", changes: "Updated product images" },
        { id: 4, date: "2023-07-18 09:20", user: "Admin", changes: "Product created" },
    ]

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

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid grid-cols-5 mb-4 w-full">
                                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                                <TabsTrigger value="images">Images</TabsTrigger>
                                <TabsTrigger value="variants">Variants</TabsTrigger>
                                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                                <TabsTrigger value="advanced">Advanced</TabsTrigger>
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
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="e.g. Premium Wireless Headphones"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">
                                                Description <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Describe your product in detail"
                                                rows={5}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="price">
                                                    Regular Price ($) <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="price"
                                                    name="price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    placeholder="e.g. 99.99"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="offerPrice">Sale Price ($)</Label>
                                                <Input
                                                    id="offerPrice"
                                                    name="offerPrice"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={formData.offerPrice}
                                                    onChange={handleChange}
                                                    placeholder="e.g. 79.99 (optional)"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="category">
                                                    Category <span className="text-red-500">*</span>
                                                </Label>
                                                <Select
                                                    value={formData.category}
                                                    onValueChange={(value) => handleSelectChange("category", value)}
                                                    required
                                                >
                                                    <SelectTrigger id="category">
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Electronics">Electronics</SelectItem>
                                                        <SelectItem value="Clothing">Clothing</SelectItem>
                                                        <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                                                        <SelectItem value="Beauty">Beauty</SelectItem>
                                                        <SelectItem value="Toys">Toys</SelectItem>
                                                        <SelectItem value="Sports">Sports</SelectItem>
                                                        <SelectItem value="Books">Books</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Tags</Label>
                                                <div className="flex flex-wrap gap-2 border rounded-md p-2 min-h-[42px]">
                                                    {formData.tags.map((tag) => (
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
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                                                                e.preventDefault()
                                                                handleTagAdd((e.target as HTMLInputElement).value.trim())
                                                                    ; (e.target as HTMLInputElement).value = ""
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500">Press Enter to add a tag</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="status"
                                                checked={formData.status === "active"}
                                                onCheckedChange={(checked) => handleSelectChange("status", checked ? "active" : "inactive")}
                                            />
                                            <Label htmlFor="status">Product is {formData.status === "active" ? "active" : "inactive"}</Label>
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
                                            {formData.variants.map((variant, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md relative"
                                                >
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`variant-name-${index}`}>Variant Type</Label>
                                                        <Select
                                                            value={variant.name}
                                                            onValueChange={(value) => handleVariantChange(index, "name", value)}
                                                        >
                                                            <SelectTrigger id={`variant-name-${index}`}>
                                                                <SelectValue placeholder="Select type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="color">Color</SelectItem>
                                                                <SelectItem value="size">Size</SelectItem>
                                                                <SelectItem value="material">Material</SelectItem>
                                                                <SelectItem value="style">Style</SelectItem>
                                                                <SelectItem value="layout">Layout</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`variant-values-${index}`}>Values</Label>
                                                        <Input
                                                            id={`variant-values-${index}`}
                                                            value={variant.values}
                                                            onChange={(e) => handleVariantChange(index, "values", e.target.value)}
                                                            placeholder="e.g. Red, Blue, Green (comma separated)"
                                                        />
                                                    </div>

                                                    {formData.variants.length > 1 && (
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
                                                onClick={addVariant}
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
                                                    name="stock"
                                                    type="number"
                                                    min="0"
                                                    value={formData.stock}
                                                    onChange={handleChange}
                                                    placeholder="e.g. 100"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                                                <Input
                                                    id="sku"
                                                    name="sku"
                                                    value={formData.sku}
                                                    onChange={handleChange}
                                                    placeholder="e.g. WH-PRO-001"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
                                            <Input
                                                id="barcode"
                                                name="barcode"
                                                value={formData.barcode}
                                                onChange={handleChange}
                                                placeholder="e.g. 8901234567890"
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
                                                name="seo.metaTitle"
                                                value={formData.seo.metaTitle}
                                                onChange={handleChange}
                                                placeholder="SEO optimized title"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="seo.metaDescription">Meta Description</Label>
                                            <Textarea
                                                id="seo.metaDescription"
                                                name="seo.metaDescription"
                                                value={formData.seo.metaDescription}
                                                onChange={handleChange}
                                                placeholder="Brief description for search results"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="seo.keywords">Keywords</Label>
                                            <Input
                                                id="seo.keywords"
                                                name="seo.keywords"
                                                value={formData.seo.keywords}
                                                onChange={handleChange}
                                                placeholder="e.g. wireless, headphones, bluetooth (comma separated)"
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
                                                name="shipping.weight"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={formData.shipping.weight}
                                                onChange={handleChange}
                                                placeholder="e.g. 0.5"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Dimensions (cm)</Label>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <Input
                                                        id="length"
                                                        name="length"
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        value={formData.shipping.dimensions.length}
                                                        onChange={handleDimensionChange}
                                                        placeholder="Length"
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        id="width"
                                                        name="width"
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        value={formData.shipping.dimensions.width}
                                                        onChange={handleDimensionChange}
                                                        placeholder="Width"
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        id="height"
                                                        name="height"
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        value={formData.shipping.dimensions.height}
                                                        onChange={handleDimensionChange}
                                                        placeholder="Height"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="shipping.freeShipping"
                                                checked={formData.shipping.freeShipping}
                                                onCheckedChange={(checked) => handleSwitchChange("shipping.freeShipping", checked)}
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
                                            checked={formData.status === "active"}
                                            onCheckedChange={(checked) => handleSelectChange("status", checked ? "active" : "inactive")}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {formData.status === "active"
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
                                <Button type="submit" className="w-full flex items-center gap-2" disabled={loading}>
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
                                <Button type="button" variant="outline" className="w-full" /*onClick={() => router.push("/products")}*/>
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
                                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        className="w-full flex items-center gap-2"
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
                        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Product Preview Dialog */}
            <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Product Preview</DialogTitle>
                        <DialogDescription>This is how your product will appear to customers</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            {imagePreviews.length > 0 ? (
                                <img
                                    src={imagePreviews[0] || "/placeholder.svg"}
                                    alt={formData.title}
                                    className="w-full h-auto rounded-md"
                                />
                            ) : (
                                <div className="w-full aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                                    <p className="text-gray-400">No image available</p>
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{formData.title || "Product Title"}</h2>

                            <div className="flex items-center gap-2 mt-2">
                                {formData.offerPrice ? (
                                    <>
                                        <span className="text-lg font-bold">${formData.offerPrice}</span>
                                        <span className="text-gray-500 line-through">${formData.price}</span>
                                        <Badge className="bg-red-500">Sale</Badge>
                                    </>
                                ) : (
                                    <span className="text-lg font-bold">${formData.price || "0.00"}</span>
                                )}
                            </div>

                            <Separator className="my-4" />

                            <div className="prose prose-sm max-w-none">
                                <p>{formData.description || "No description available."}</p>
                            </div>

                            {formData.variants.length > 0 && formData.variants[0].name && (
                                <div className="mt-4">
                                    <h3 className="font-medium mb-2">
                                        {formData.variants[0].name.charAt(0).toUpperCase() + formData.variants[0].name.slice(1)}:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.variants[0].values.split(",").map((value, i) => (
                                            <Badge key={i} variant="outline" className="cursor-pointer hover:bg-gray-100">
                                                {value.trim()}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex gap-2">
                                <Button className="flex-1">Add to Cart</Button>
                                <Button variant="outline">Buy Now</Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

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
