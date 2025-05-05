"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "../../../../lib/Types"
import { Star, User } from "lucide-react"

interface ProductTabsProps {
    product: Product
}

export default function ProductTabs({ product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState("description")

    const tabs = [
        { id: "description", label: "Description" },
        { id: "specifications", label: "Specifications" },
        { id: "reviews", label: "Reviews" },
    ]

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b">
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-6 py-3 text-sm font-medium relative ${activeTab === tab.id ? "text-rose-600" : "text-gray-600 hover:text-gray-900"
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600" layoutid="activeTab" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === "description" && (
                            <div className="prose max-w-none">
                                <p>{product.description}</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl eget
                                    ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies.
                                </p>
                                <p>
                                    Sed euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget
                                    ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                        )}

                        {activeTab === "specifications" && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-900 mb-2">Dimensions</h3>
                                        <ul className="space-y-1 text-sm">
                                            {
                                                [
                                                    { dimension: "Height", value: "10 inches" },
                                                    { dimension: "Width", value: "10 inches" },
                                                    { dimension: "Depth", value: "10 inches" },
                                                    { dimension: "Weight", value: "10 inches" },
                                                ].map((item, index) => (
                                                    <li className="flex justify-between">
                                                        <span className="text-gray-600">{item.dimension}</span>
                                                        <span>{item.value}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-900 mb-2">Materials</h3>
                                        <ul className="space-y-1 text-sm">
                                            {
                                                [
                                                    { material: "Outer", label: "100% Cotton" },
                                                    { material: "Lining", label: "Polyester" },
                                                    { material: "Sole", label: "Rubber" },
                                                ].map((item, index) => (
                                                    <li key={index} className="flex justify-between">
                                                        <span className="text-gray-600">{item.material}</span>
                                                        <span>{item.label}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-2">Features</h3>
                                    <ul className="space-y-1 text-sm">
                                        {
                                            ["Watter resistant",
                                                "Adjustable straps",
                                                "Multiple pockets for storage",
                                                "Breathable fabric"].map((feature, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="text-hiakri-dark mr-2">•</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center">
                                            {Array(5)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={18}
                                                        className={`${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            <span className="ml-2 text-sm text-gray-600">Based on {product.reviewCount} reviews</span>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors">
                                        Write a Review
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        {
                                            name: "John Doe",
                                            rating: 5,
                                            date: "2 weeks ago",
                                            comment: "Great product! Exactly as described and arrived quickly.",
                                        },
                                        {
                                            name: "Jane Smith",
                                            rating: 4,
                                            date: "1 month ago",
                                            comment:
                                                "Good quality but slightly smaller than expected. Otherwise very happy with my purchase.",
                                        },
                                        {
                                            name: "Mike Johnson",
                                            rating: 5,
                                            date: "2 months ago",
                                            comment: "Excellent product and great value for money. Would definitely recommend!",
                                        },
                                    ].map((review, index) => (
                                        <div key={index} className="border-b pb-4 last:border-0">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center">
                                                    <div className="bg-gray-100 rounded-full p-2 mr-3">
                                                        <User size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{review.name}</div>
                                                        <div className="text-xs text-gray-500">{review.date}</div>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    {Array(5)
                                                        .fill(0)
                                                        .map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={14}
                                                                className={`${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                                            />
                                                        ))}
                                                </div>
                                            </div>
                                            <p className="mt-2 text-gray-600 text-sm">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
