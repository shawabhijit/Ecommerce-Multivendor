import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../Components/ui/dialog'
import { Separator } from '../../../Components/ui/separator'
import { Button } from '../../../Components/ui/button'
import { Badge } from '../../../Components/ui/badge'

const ProductPreview = ({showPreviewDialog , setShowPreviewDialog , imagePreviews}) => {

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
                            {formData.sellingPrice ? (
                                <>
                                    <span className="text-lg font-bold">${formData.sellingPrice}</span>
                                    <span className="text-gray-500 line-through">${formData.mrpPrice}</span>
                                    <Badge className="bg-red-500">Sale</Badge>
                                </>
                            ) : (
                                <span className="text-lg font-bold">${formData.mrpPrice || "0.00"}</span>
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
    )
}

export default ProductPreview