"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProductGrid from "./ProductGrid"
import FilterSidebar from "./ProductFilterSidebar"
import SortDropdown from "./SortBy"
import { FilterIcon } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useAppDispatch } from "../../../../app/Store"
import { fetchAllProducts } from "../../../../app/customer/ProductSlice"
import { Products, ProductsResponse } from "../../../../types/ProductTupe"

export default function ProductsPage() {
    const location = useLocation();
    const categoryFromNav = location.state?.selecteedCategory || "";
    const dispatch = useAppDispatch();

    //console.log('categoryFromNav', categoryFromNav)
    const [productResponse , setProductResponse ] = useState<ProductsResponse>()
    const [products, setProducts] = useState<Products[]>([])
    const [loading, setLoading] = useState(true)
    // const [searchQuery, setSearchQuery] = useState("")
    const [sortOption, setSortOption] = useState("featured")
    const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryFromNav ? [categoryFromNav] : [])
    const [priceRange , setPriceRange ] = useState({min: '', max:''});
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    console.log(priceRange)

    const fetchAllProduct = async () => {
        const res = await dispatch(fetchAllProducts({
            categories: categories,
            minPrice: priceRange.min !== '' ? Number(priceRange.min) : undefined,
            maxPrice: priceRange.max !== '' ? Number(priceRange.max) : undefined
        }));
        console.log("response in product page of all products ,", res);
        if (res.meta.requestStatus == "fulfilled") {
            setProductResponse(res.payload)
            console.log(productResponse)
            setProducts(res.payload.content);
            setLoading(false);
        }
        else {
            setLoading(true);
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })

        if (categoryFromNav && !selectedCategories.includes(categoryFromNav)) {
            setSelectedCategories([categoryFromNav])
        }
        
        fetchAllProduct();
    }, [categoryFromNav])


    // Filter products based on search query and selected categories
    const filteredProducts = products.filter((product) => {
        // const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category.name)
        const min = priceRange.min !== '' ? Number(priceRange.min) : 0;
        const max = priceRange.max !== '' ? Number(priceRange.max) : Infinity;
        const matchesPriceRange = product.mrpPrice >= min && product.mrpPrice <= max;
        return matchesCategory && matchesPriceRange
    })

    // Sort products based on selected sort option
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "price-low-high":
                return a.mrpPrice - b.mrpPrice
            case "price-high-low":
                return b.mrpPrice - a.mrpPrice
            case "rating":
                return (b.ratings?.count ?? 0) - (a.ratings?.count ?? 0)
            default:
                return 0
        }
    })

    const categories = Array.from(new Set(products.map((product) => product.category.name)))

    return (
        <div className="min-h-screen bg-white mt-34 md:mt-20">

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar for desktop */}
                    <div className="hidden md:block w-64 flex-shrink-0">
                        <FilterSidebar
                            categories={categories}
                            selectedCategories={selectedCategories}
                            onCategoryChange={setSelectedCategories}
                            priceRange={priceRange}
                            onPriceChange={setPriceRange}
                        />
                    </div>

                    {/* Mobile sidebar */}
                    {isMobileSidebarOpen && (
                        <div className="fixed inset-0 bg-white bg-opacity-50 z-50 md:hidden">
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
                                        priceRange={priceRange}
                                        onPriceChange={setPriceRange}
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
                                <div className="mb-8 text-[12px] md:text-sm text-gray-500 flex items-center justify-between">
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
