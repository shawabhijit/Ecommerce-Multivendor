"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getProductById, getProducts } from "@/lib/api"
import type { Product } from "@/lib/Types"
import ImageGallery from "./ImageGallery"
import ProductInfo from "./ProductInfo"
import ProductTabs from "./ProductTabs"
import RelatedProducts from "./RelatedProducts"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function ProductDetails({ id }: { id: string }) {
    const [product, setProduct] = useState<Product | null>(null)
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                console.log('id', id)
                const productData = await getProductById(id)
                console.log('productData', productData)
                setProduct(productData)

                // Fetch related products
                const allProducts = await getProducts()
                const related = allProducts
                    .filter((p) => p.category === productData.category && p.id !== productData.id)
                    .slice(0, 8)
                setRelatedProducts(related)

                setLoading(false)
            } catch (error) {
                console.error("Error fetching product:", error)
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-6 w-32 bg-gray-200 rounded mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-200 h-96 rounded-lg"></div>
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded w-1/3 mt-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
                    <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 relative">
            <div className="container mx-auto px-4 py-8">
                <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        <ImageGallery images={product.images || [product.image]} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <ProductInfo product={product} />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <ProductTabs product={product} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-16"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
                    <RelatedProducts products={relatedProducts} />
                </motion.div>
            </div>
        </div>
    )
}
