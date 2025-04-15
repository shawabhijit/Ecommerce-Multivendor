"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

interface SearchBarProps {
    onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    const value = e.target.value
                    setQuery(value)
                    onSearch(value)
                }}
                placeholder="Search products..."
                className="w-full py-2 pl-10 pr-4 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-hiakri/50 transition-all"
            />
            <motion.button
                type="submit"
                className="absolute left-3 top-[35%] transform text-gray-400"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.3 }}
            >
                <Search size={18} />
            </motion.button>
        </form>
    )
}
