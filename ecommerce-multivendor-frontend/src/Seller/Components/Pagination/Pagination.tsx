import { useState } from 'react'
import { Button } from '../../../Components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ filteredOrders, totalPages, indexOfFirstOrder, indexOfLastOrder, currentPage, setCurrentPage }) => {

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)


    return (
        <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
                Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
                {filteredOrders.length} orders
            </p>
            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <Button
                        key={number}
                        variant={currentPage === number ? "default" : "outline"}
                        size="icon"
                        onClick={() => paginate(number)}
                        className="h-8 w-8"
                    >
                        {number}
                    </Button>
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default Pagination