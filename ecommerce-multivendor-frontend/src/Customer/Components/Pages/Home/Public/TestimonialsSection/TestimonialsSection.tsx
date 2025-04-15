import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Fashion Retailer",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        content: "HiakriHub transformed my small boutique into a thriving online business. The platform is so easy to use, and the support team is always there when I need help. My sales have increased by 200% since joining!",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Electronics Vendor",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        content: "I've been selling electronics on multiple platforms, but HiakriHub offers the best tools and visibility. The analytics dashboard helps me understand my customers better, and the commission rates are very reasonable.",
        rating: 5
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Customer",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        content: "As a frequent online shopper, I love HiakriHub's wide selection and reliable service. The website is intuitive, and I always find what I'm looking for at great prices. Fast shipping is the cherry on top!",
        rating: 4
    },
    {
        id: 4,
        name: "David Kumar",
        role: "Home Goods Seller",
        avatar: "https://randomuser.me/api/portraits/men/62.jpg",
        content: "The seller dashboard is incredibly powerful yet simple to use. I can manage inventory, track orders, and communicate with customers all in one place. HiakriHub has helped me scale my business beyond my expectations.",
        rating: 5
    },
    {
        id: 5,
        name: "Jessica Taylor",
        role: "Customer",
        avatar: "https://randomuser.me/api/portraits/women/17.jpg",
        content: "The customer service is outstanding! I had an issue with an order, and it was resolved within hours. The return process is also hassle-free. I recommend HiakriHub to everyone I know!",
        rating: 5
    }
];

const TestimonialsSection = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const timeoutRef = useRef<number | null>(null);
    const sectionRef = useRef(null);

    const nextTestimonial = () => {
        setDirection(1);
        setCurrent(prev => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setDirection(-1);
        setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Auto-scroll functionality
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(nextTestimonial, 6000);

        return () => {
            resetTimeout();
        };
    }, [current]);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section id="testimonials" ref={sectionRef} className="section-padding">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
                    <p className="text-xl text-gray-600">
                        Don't just take our word for it. Hear from our community of sellers and customers
                        who have experienced the HiakriHub difference.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden relative min-h-[420px] md:min-h-[400px]">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="bg-white rounded-2xl shadow-xl p-8 md:p-12 absolute top-0 left-0 w-full"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <img
                                            src={testimonials[current].avatar}
                                            alt={testimonials[current].name}
                                            className="w-20 h-20 rounded-full object-cover border-4 border-hiakri/20"
                                        />
                                    </div>

                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-6 w-6 ${i < testimonials[current].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>

                                    <blockquote className="text-xl italic text-gray-700 mb-6">
                                        "{testimonials[current].content}"
                                    </blockquote>

                                    <h4 className="text-xl font-bold">{testimonials[current].name}</h4>
                                    <p className="text-gray-600">{testimonials[current].role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 bg-white shadow-lg rounded-full p-3 text-gray-600 hover:text-hiakri transition-colors z-10"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 bg-white shadow-lg rounded-full p-3 text-gray-600 hover:text-hiakri transition-colors z-10"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > current ? 1 : -1);
                                    setCurrent(index);
                                }}
                                className={`h-3 w-3 rounded-full transition-colors ${index === current ? 'bg-hiakri' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;