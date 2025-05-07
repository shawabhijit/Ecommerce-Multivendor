"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProductGrid from "./ProductGrid"
import FilterSidebar from "./ProductFilterSidebar"
import SearchBar from "./ProductSearchbar"
import SortDropdown from "./SortBy"
import type { Product } from "../../../../lib/Types"
import { getProducts } from "../../../../lib/api"
import { FilterIcon } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

export default function ProductsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const categoryFromNav = location.state?.selecteedCategory || "";

    console.log('categoryFromNav', categoryFromNav)

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOption, setSortOption] = useState("featured")
    const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryFromNav ? [categoryFromNav] : [])
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })

        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching products:", error)
                setLoading(false)
            }
        }

        if (categoryFromNav && !selectedCategories.includes(categoryFromNav)) {
            setSelectedCategories([categoryFromNav])
        }

        fetchProducts()
    }, [categoryFromNav])


    // Filter products based on search query and selected categories
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
        return matchesSearch && matchesCategory
    })

    // Sort products based on selected sort option
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "price-low-high":
                return a.price - b.price
            case "price-high-low":
                return b.price - a.price
            case "rating":
                return b.rating - a.rating
            default:
                return 0
        }
    })

    const categories = Array.from(new Set(products.map((product) => product.category)))

    return (
        <div className="min-h-screen bg-gray-50 mt-24">

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar for desktop */}
                    <div className="hidden md:block w-64 flex-shrink-0">
                        <FilterSidebar
                            categories={categories}
                            selectedCategories={selectedCategories}
                            onCategoryChange={setSelectedCategories}
                        />
                    </div>

                    {/* Mobile sidebar */}
                    {isMobileSidebarOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", damping: 25 }}
                                className="absolute top-0 left-0 h-full w-80 bg-white shadow-lg"
                            >
                                <div className="p-4 flex justify-between items-center border-b">
                                    <h2 className="text-lg font-semibold">Filters</h2>
                                    <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                                        ✕
                                    </button>
                                </div>
                                <div className="p-4">
                                    <FilterSidebar
                                        categories={categories}
                                        selectedCategories={selectedCategories}
                                        onCategoryChange={(categories) => {
                                            setSelectedCategories(categories)
                                            setIsMobileSidebarOpen(false)
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Main content */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {[...Array(8)].map((_, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-md p-4 h-80 animate-pulse">
                                        <div className="bg-gray-200 h-40 rounded-md mb-4"></div>
                                        <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                                        <div className="bg-gray-200 h-4 rounded w-1/2 mb-2"></div>
                                        <div className="bg-gray-200 h-4 rounded w-1/4"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="mb-8 text-sm text-gray-500 flex items-center justify-between">
                                    <p>Showing {sortedProducts.length} products</p>
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <SortDropdown value={sortOption} onChange={setSortOption} />
                                        <button
                                            onClick={() => setIsMobileSidebarOpen(true)}
                                            className="md:hidden flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                        >
                                            <FilterIcon size={18} />
                                            <span>Filters</span>
                                        </button>
                                    </div>
                                </div>
                                <ProductGrid products={sortedProducts} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
