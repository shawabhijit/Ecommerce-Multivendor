"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../../../../../Components/ui/button"

const banners = [
    {
        id: 1,
        title: "",
        description: "",
        image: "https://res.cloudinary.com/dvkvr88db/image/upload/v1747757854/6f68b49c-49ef-4a76-8214-2a96a6e714ab1745924851912-Herd-se-hatke_fzjaep.webp",
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "New Arrivals",
        description: "Check out our latest products",
        image: "https://res.cloudinary.com/dvkvr88db/image/upload/v1746802296/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK_lzhjfy_m9xddk.jpg",
        color: "bg-purple-500",
    },
    {
        id: 3,
        title: "Flash Deals",
        description: "Limited time offers on top brands",
        image: "https://res.cloudinary.com/dvkvr88db/image/upload/v1747757727/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner_gcvgus.jpg",
        color: "bg-green-500",
    },
]

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(0)

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
        }),
    }

    const nextSlide = () => {
        setDirection(1)
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
    }

    // const prevSlide = () => {
    //     setDirection(-1)
    //     setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
    // }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative overflow-hidden rounded-xl pt-8 md:pt-0">
            <div className="aspect-[1.5] md:aspect-[3/1] w-full relative">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="absolute inset-0"
                    >
                        <div className={`w-full h-full flex items-center relative `}
                            style={{
                                backgroundImage:`url(${banners[current].image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10 " />
                            <div className="container mx-auto px-2 md:px-10 relative z-20">
                                <div className="w-full md:w-1/2 text-white p-6 md:p-10 ">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl md:text-5xl font-bold mb-4"
                                    >
                                        {banners[current].title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-lg md:text-xl mb-6"
                                    >
                                        {banners[current].description}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {banners[current].id > 1 && <Button className="bg-white text-black hover:bg-gray-100">Shop Now</Button>}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full shadow-md"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full shadow-md"
                onClick={nextSlide}
            >
                <ChevronRight className="h-5 w-5" />
            </Button> */}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {banners.map((_, index) => (
                    (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > current ? 1 : -1)
                                setCurrent(index)
                            }}
                            className={`w-2 h-2 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}
                        />
                    )
                ))}
            </div>
        </div>
    )
}
