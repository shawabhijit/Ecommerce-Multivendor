import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Package, Clock, HeadphonesIcon } from 'lucide-react';

const counterItems = [
    { number: 1000000, label: "Products", suffix: "+" },
    { number: 50000, label: "Sellers", suffix: "+" },
    { number: 5000000, label: "Customers", suffix: "+" },
    { number: 99.8, label: "Satisfaction Rate", suffix: "%" }
];

const AnimatedCounter = ({ value, suffix }: { value: number, suffix: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start > end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    const formattedCount = count.toLocaleString();

    return (
        <div ref={ref} className="text-4xl font-bold text-[#3571bb] mb-2">
            {formattedCount}{suffix}
        </div>
    );
};

const whyChooseUs = [
    {
        icon: <Shield className="h-10 w-10 text-[#3571bb]" />,
        title: "100% Secure Payment",
        description: "All our payments are processed through secure payment gateways with industry-leading encryption."
    },
    {
        icon: <Package className="h-10 w-10 text-[#F97316]" />,
        title: "Easy Returns",
        description: "Not satisfied? Return your products within 30 days for a full refund, no questions asked."
    },
    {
        icon: <Clock className="h-10 w-10 text-[#10B981]" />,
        title: "Fast Delivery",
        description: "Experience lightning-fast delivery with our network of trusted logistics partners."
    },
    {
        icon: <HeadphonesIcon className="h-10 w-10 text-[#8b5CF6]" />,
        title: "24/7 Customer Support",
        description: "Our dedicated support team is available around the clock to assist you with any questions."
    }
];

const WhyChooseUsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="why-choose-us" className="py-16 md:py24 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Why Choose HiakriHub?</h2>
                    <p className="text-xl text-gray-600">
                        We're committed to providing the best online shopping experience with top-notch security,
                        selection, and service.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {counterItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center p-4"
                        >
                            <AnimatedCounter value={item.number} suffix={item.suffix} />
                            <div className="text-gray-600 text-lg">{item.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whyChooseUs.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-md card-hover"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;