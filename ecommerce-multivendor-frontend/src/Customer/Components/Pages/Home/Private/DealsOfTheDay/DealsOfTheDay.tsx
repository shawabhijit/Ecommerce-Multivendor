"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../../../../../Components/ui/button"
import ProductCard from "../HomeProductCard/HomeProductCard"

// Mock data for deals
const dealProducts = [
    {
        id: 1,
        name: "Wireless Earbuds",
        price: 49.99,
        originalPrice: 99.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.5,
        discount: 50,
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 129.99,
        originalPrice: 199.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.2,
        discount: 35,
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        originalPrice: 149.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        discount: 47,
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 39.99,
        originalPrice: 69.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.3,
        discount: 43,
    },
    {
        id: 5,
        name: "Gaming Mouse",
        price: 29.99,
        originalPrice: 59.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
        discount: 50,
    },
    {
        id: 6,
        name: "Mechanical Keyboard",
        price: 89.99,
        originalPrice: 149.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
        discount: 40,
    },
    {
        id: 5,
        name: "Gaming Mouse",
        price: 29.99,
        originalPrice: 59.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
        discount: 50,
    },
    {
        id: 6,
        name: "Mechanical Keyboard",
        price: 89.99,
        originalPrice: 149.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
        discount: 40,
    },
    {
        id: 5,
        name: "Gaming Mouse",
        price: 29.99,
        originalPrice: 59.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
        discount: 50,
    },
    {
        id: 6,
        name: "Mechanical Keyboard",
        price: 89.99,
        originalPrice: 149.99,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
        discount: 40,
    },
]

export default function DealsOfTheDay() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 10,
        minutes: 30,
        seconds: 0,
    })
    const scrollRef = useRef<HTMLDivElement>(null)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newSeconds = prevTime.seconds - 1
                const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes
                const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours

                return {
                    hours: newHours < 0 ? 23 : newHours,
                    minutes: newMinutes < 0 ? 59 : newMinutes,
                    seconds: newSeconds < 0 ? 59 : newSeconds,
                }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef
            const scrollAmount = 300
            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" })
            }
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="p-6 bg-white"
        >
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Deals of the Day</h2>
                    <p className="text-gray-500">Limited time offers, don't miss out!</p>
                </div>

                <div className="flex items-center justify-between mt-4 md:mt-0 mb-7">
                    <div className="flex items-center space-x-2 mr-4">
                        <div className="bg-primary text-white rounded-md px-2 py-1 text-xl font-bold">
                            {String(timeLeft.hours).padStart(2, "0")}
                        </div>
                        <span className="text-xl font-bold">:</span>
                        <div className="bg-primary text-white rounded-md px-2 py-1 text-xl font-bold">
                            {String(timeLeft.minutes).padStart(2, "0")}
                        </div>
                        <span className="text-xl font-bold">:</span>
                        <div className="bg-primary text-white rounded-md px-2 py-1 text-xl font-bold">
                            {String(timeLeft.seconds).padStart(2, "0")}
                        </div>
                    </div>
                    <div className="md:hidden flex items-center space-x-2">
                        <Button variant="outline" size="icon" onClick={() => scroll("left")}>
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => scroll("right")}>
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="
                    flex 
                    flex-nowrap 
                    md:flex-wrap 
                    md:justify-baseline
                    overflow-x-auto 
                    md:overflow-x-visible 
                    gap-4 
                    md:gap-8
                    pb-4 
                    scrollbar-hide
                "
            >
                {dealProducts.map((product, index) => (
                    <ProductCard
                        key={`${product.id}-${index}`}
                        product={product}
                        index={index}
                        isInView={isInView}
                        showDiscount
                    />
                ))}
            </div>


        </motion.div>
    )
}
