"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Edit, MoreHorizontal, Package, Plus, Trash2 } from "lucide-react"

import { Button } from "../../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Components/ui/card"
import { Badge } from "../../Components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../Components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../Components/ui/dialog"
import { Checkbox } from "../../Components/ui/checkbox"
import { productCategories, productStatus } from "../Data/api"
import FilterSearch from "../Components/FilterSearch/FilterSearch"
import Pagination from "../Components/Pagination/Pagination"
import { useAppDispatch } from "../../app/Store"
import { fetchSellerProducts } from "../../app/seller/SellerProductSlice"
import { Products } from "../../types/ProductTupe"
import { number } from "zod"
// Mock data for products


export function ProductManagement() {
    const [products, setProducts] = useState<Products[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProducts, setSelectedProducts] = useState<number[]>([])
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState<number | null>(null)

    const productsPerPage = 5

    const dispatch = useAppDispatch();

    const fetchProducts = async () => {
        const prod = await dispatch(fetchSellerProducts());
        if (fetchSellerProducts.fulfilled.match(prod)) {
            const SellerProducts = prod.payload as Products[];
            console.log("seller products :", SellerProducts);
            setProducts(SellerProducts);
        } else {
            console.error("Failed to fetch seller products:", prod.error);
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const prod = await dispatch(fetchSellerProducts());
            if (fetchSellerProducts.fulfilled.match(prod)) {
                const SellerProducts = prod.payload as Products[];
                // console.log("seller products :", SellerProducts);
                setProducts(SellerProducts);
            } else {
                console.error("Failed to fetch seller products:", prod.error);
            }
        }
        fetchProducts()
    }, [products])

    // Filter products based on search query and filters
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id === +searchQuery ||
            product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "in_stock" && product.quantity > 0) ||
            (statusFilter === "out_of_stock" && product.quantity === 0) ||
            statusFilter === product.status

        const matchesCategory = categoryFilter === "all" || categoryFilter === product.category.name

        return matchesSearch && matchesStatus && matchesCategory
    })

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedProducts(currentProducts.map((product) => product.id))
        } else {
            setSelectedProducts([])
        }
    }

    const handleSelectProduct = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedProducts([...selectedProducts, id])
        } else {
            setSelectedProducts(selectedProducts.filter((id) => id !== id))
        }
    }

    const handleDeleteProduct = (id: number) => {
        setProductToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (productToDelete) {
            setProducts(products.filter((product) => product.id !== productToDelete))
            setSelectedProducts(selectedProducts.filter((id) => id !== productToDelete))
            setIsDeleteDialogOpen(false)
            setProductToDelete(null)
        }
    }

    const handleBulkDelete = () => {
        setProducts(products.filter((product) => !selectedProducts.includes(product.id)))
        setSelectedProducts([])
    }

    const getStatusBadge = (status: string, stock: number) => {
        if (status === "inactive") {
            return (
                <Badge variant="outline" className="bg-gray-100 text-gray-700">
                    Inactive
                </Badge>
            )
        } else if (stock === 0) {
            return (
                <Badge variant="outline" className="bg-red-100 text-red-700">
                    Out of Stock
                </Badge>
            )
        } else if (stock < 20) {
            return (
                <Badge variant="outline" className="bg-amber-100 text-amber-700">
                    Low Stock
                </Badge>
            )
        } else {
            return (
                <Badge variant="outline" className="bg-green-100 text-green-700">
                    In Stock
                </Badge>
            )
        }
    }

    return (
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Product Management</h1>
                    <p className="text-gray-500">Manage your product inventory and listings</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link to="/seller/products/add">
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Add New Product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filters and Search */}
            <FilterSearch
                data={productStatus}
                data2={productCategories}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
            />

            {/* Products Table */}
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>{filteredProducts.length} products found</CardDescription>
                        </div>
                        {selectedProducts.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2"
                            >
                                <span className="text-sm text-gray-500">{selectedProducts.length} selected</span>
                                <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="flex items-center gap-1">
                                    <Trash2 className="h-4 w-4" /> Delete
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-2 text-left">
                                        <Checkbox
                                            checked={currentProducts.length > 0 && selectedProducts.length === currentProducts.length}
                                            onCheckedChange={handleSelectAll}
                                            aria-label="Select all products"
                                        />
                                    </th>
                                    <th className="py-3 px-2 text-left">Image</th>
                                    <th className="py-3 px-4 text-left">Product</th>
                                    <th className="py-3 px-4 text-left">Price</th>
                                    <th className="py-3 px-4 text-left">Stock</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {currentProducts.map((product) => (
                                        <motion.tr
                                            key={product.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="py-3 px-2">
                                                <Checkbox
                                                    checked={selectedProducts.includes(product.id)}
                                                    onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                                                    aria-label={`Select ${product.title}`}
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                                                    {product.images ? (
                                                        <img
                                                            src={product.images[0] || "/placeholder.svg"}
                                                            alt={product.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="h-6 w-6 text-gray-400" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="font-medium">{product.title}</p>
                                                    <p className="text-xs text-gray-500">{product.id}</p>
                                                    {product.variants?.length > 0 && (
                                                        <div className="flex gap-1 mt-1">
                                                            {product.variants.map((variant, idx) => (
                                                                <Badge key={idx} variant="outline" className="text-xs">
                                                                    {variant.name}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    {product.sellingPrice ? (
                                                        <>
                                                            <p className="font-medium">${product.sellingPrice.toFixed(2)}</p>
                                                            <p className="text-xs text-gray-500 line-through">${product.mrpPrice.toFixed(2)}</p>
                                                        </>
                                                    ) : (
                                                        <p className="font-medium">${product.mrpPrice.toFixed(2)}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="font-medium">{product.quantity}</p>
                                            </td>
                                            <td className="py-3 px-4">{getStatusBadge(product.status, product.quantity)}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Link to={`/seller/product/edit/${product.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-red-600"
                                                                onClick={() => handleDeleteProduct(product.id)}
                                                            >
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {currentProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-gray-500">
                                            No products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            filteredOrders={filteredProducts}
                            totalPages={totalPages}
                            indexOfFirstOrder={indexOfFirstProduct}
                            indexOfLastOrder={indexOfLastProduct}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this product? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}