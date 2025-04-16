import React from 'react'
import {motion } from "motion/react"
import { Button } from '../../../../../../Components/ui/button'
import { ShoppingBag, Users } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />

                {/* Animated Shapes */}
                <motion.div
                    className="absolute top-1/4 right-1/6 w-64 h-64 rounded-full bg-hiakri/5"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />

                <motion.div
                    className="absolute bottom-1/4 left-1/6 w-48 h-48 rounded-full bg-hiakri-orange/5"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1
                    }}
                />
            </div>

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                        Your One-Stop <span className="text-[#3B82F6]">Online Marketplace</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 md:pr-12">
                        Join the ultimate multi-vendor platform featuring lightning-fast delivery,
                        secure payments, and thousands of products across all categories.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button className="btn-primary inline-flex items-center gap-2 text-lg py-6 px-8">
                                <ShoppingBag className="h-5 w-5" />
                                Shop Now
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="outline" className="btn-secondary inline-flex items-center gap-2 text-lg py-6 px-8">
                                <Users className="h-5 w-5" />
                                Become a Seller
                            </Button>
                        </motion.div>
                    </div>

                    <div className="mt-12 flex items-center gap-8">
                        <div>
                            <p className="text-4xl font-bold text-[#3B82F6]">50K+</p>
                            <p className="text-sm text-gray-600">Products</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-[#3B82F6]">10K+</p>
                            <p className="text-sm text-gray-600">Sellers</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-[#3B82F6]">2M+</p>
                            <p className="text-sm text-gray-600">Customers</p>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center"
                >
                    <div className="relative w-full max-w-lg">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                alt="HiakriHub Marketplace"
                                className="rounded-2xl shadow-2xl w-full"
                            />
                        </motion.div>

                        {/* Floating elements */}
                        <motion.div
                            className="absolute -left-10 top-1/4 bg-white p-4 rounded-lg shadow-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-[#10B981]/20 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Secure Payment</p>
                                    <p className="text-xs text-gray-500">100% Protected</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute -right-10 top-2/3 bg-white p-4 rounded-lg shadow-lg"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-hiakri-[#F97316]/20 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Fast Delivery</p>
                                    <p className="text-xs text-gray-500">Within 24 hours</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection