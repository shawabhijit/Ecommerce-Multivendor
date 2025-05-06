import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../Components/ui/dialog'
import { Separator } from '../../../Components/ui/separator'
import { Button } from '../../../Components/ui/button'
import { Badge } from '../../../Components/ui/badge'
import { useAppDispatch } from '../../../app/Store'
import { fetchSellerProducts } from '../../../app/seller/SellerProductSlice'
import { api } from '../../../config/api'

const ProductPreview = ({ id , showPreviewDialog, setShowPreviewDialog, imagePreviews }) => {

    const dispatch = useAppDispatch();

    // Sample form data for preview
    const [response, setResponse] = useState<any>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get(`/products/${id}`)
                console.log("Product fetched successfully, Response:", res.data);
                setResponse(res);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, [dispatch]);


    console.log("response from product preview", response)

    const formData = {
        title: "Sample Product",
        description: "This is a sample product description.",
        mrpPrice: 100,
        sellingPrice: 80,
        variants: [
            {
                name: "Color",
                values: "Red, Green, Blue"
            }
        ]
    }

    return (
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
                                alt={response?.title}
                                className="w-full h-auto rounded-md"
                            />
                        ) : (
                            <div className="w-full aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                                <p className="text-gray-400">No image available</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{response?.data.title || "Product Title"}</h2>

                        <div className="flex items-center gap-2 mt-2">
                            {response?.data.sellingPrice ? (
                                <>
                                    <span className="text-lg font-bold">${response?.data.sellingPrice}</span>
                                    <span className="text-gray-500 line-through">${response?.data.mrpPrice}</span>
                                    <Badge className="bg-red-500">Sale</Badge>
                                </>
                            ) : (
                                <span className="text-lg font-bold">${response?.data.mrpPrice || "0.00"}</span>
                            )}
                        </div>

                        <Separator className="my-4" />

                        <div className="prose prose-sm max-w-none">
                            <p>{response?.data.description || "No description available."}</p>
                        </div>

                        {response?.data.variants?.length > 0 && response?.data.variants[0].name && (
                            <div className="mt-4">
                                <h3 className="font-medium mb-2">
                                    {response?.data.variants[0].name.charAt(0).toUpperCase() + response?.data.variants[0].name.slice(1)}:
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {response?.data.variants[0].value?.split(",").map((value, i) => (
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
    )
}

export default ProductPreview