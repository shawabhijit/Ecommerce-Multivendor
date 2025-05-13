"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../Components/ui/select"

interface SortDropdownProps {
    value: string
    onChange: (value: string) => void
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
    return (
        <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2 hidden sm:inline">Sort by:</span>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-[160px] bg-gray-100 border-none  ">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
