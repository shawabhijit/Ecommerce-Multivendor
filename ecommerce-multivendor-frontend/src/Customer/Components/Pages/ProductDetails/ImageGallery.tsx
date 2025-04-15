"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface ImageGalleryProps {
    images: string[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false)
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100

        setZoomPosition({ x, y })
    }

    return (
        <div className="relative">
            <div
                className={`relative overflow-hidden rounded-xl bg-white ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                style={{ height: "400px" }}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleMouseMove}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-full w-full"
                    >
                        <img src={"https://m.media-amazon.com/images/I/61Krw8gk0aL._SY879_.jpg"} alt="" className={`w-full h-full object-contain p-4 transition-transform duration-200
                                ${isZoomed ? "scale-150" : "scale-100"}`}
                            style={
                                isZoomed
                                    ? {
                                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                    }
                                    : {}
                            }
                        />
                    </motion.div>
                </AnimatePresence>

                {!isZoomed && (
                    <button
                        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
                        onClick={(e) => {
                            e.stopPropagation()
                            handlePrevImage()
                        }}
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}

                {!isZoomed && (
                    <button
                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleNextImage()
                        }}
                    >
                        <ChevronRight size={20} />
                    </button>
                )}

                {!isZoomed && (
                    <div className="absolute bottom-2 right-2 bg-white/80 p-2 rounded-full shadow-md z-10">
                        <ZoomIn size={20} />
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative h-16 w-16 flex-shrink-0 cursor-pointer rounded-md border-2 overflow-hidden ${index === currentImageIndex ? "border-rose-500" : "border-transparent"
                                }`}
                            onClick={() => setCurrentImageIndex(index)}
                        >
                            <img src={"https://m.media-amazon.com/images/I/61Krw8gk0aL._SY879_.jpg"} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
