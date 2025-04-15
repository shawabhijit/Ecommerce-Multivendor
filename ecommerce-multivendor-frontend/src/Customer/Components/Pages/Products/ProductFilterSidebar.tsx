"use client"

import { motion } from "framer-motion"
import { Checkbox } from "../../../../Components/ui/checkbox"
import { Label } from "../../../../Components/ui/label"

interface FilterSidebarProps {
    categories: string[]
    selectedCategories: string[]
    onCategoryChange: (categories: string[]) => void
}

export default function FilterSidebar({ categories, selectedCategories, onCategoryChange }: FilterSidebarProps) {
    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            onCategoryChange(selectedCategories.filter((c) => c !== category))
        } else {
            onCategoryChange([...selectedCategories, category])
        }
    }

    const handleClearAll = () => {
        onCategoryChange([])
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-5"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {selectedCategories.length > 0 && (
                    <button onClick={handleClearAll} className="text-sm text-rose-600 hover:text-rose-700 font-medium">
                        Clear All
                    </button>
                )}
            </div>

            <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                                id={`category-${category}`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => handleCategoryChange(category)}
                            />
                            <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t mt-6 pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" className="w-full p-2 border rounded-md text-sm" />
                    <span className="text-gray-500">-</span>
                    <input type="number" placeholder="Max" className="w-full p-2 border rounded-md text-sm" />
                </div>
            </div>

            <div className="border-t mt-6 pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                            <Checkbox id={`rating-${rating}`} />
                            <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer flex items-center">
                                {Array(rating)
                                    .fill(0)
                                    .map((_, i) => (
                                        <span key={i} className="text-yellow-400">
                                            ★
                                        </span>
                                    ))}
                                {Array(5 - rating)
                                    .fill(0)
                                    .map((_, i) => (
                                        <span key={i} className="text-gray-300">
                                            ★
                                        </span>
                                    ))}
                                <span className="ml-1">& Up</span>
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
