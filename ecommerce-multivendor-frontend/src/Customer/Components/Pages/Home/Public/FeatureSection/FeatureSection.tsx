import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Truck, Search, ShieldCheck, PieChart } from 'lucide-react';

const features = [
    {
        icon: <Users className="h-12 w-12 text-[#3571bb]" />,
        title: "Multiple Seller Support",
        description: "Our platform supports thousands of sellers offering millions of products. Join our thriving community of entrepreneurs."
    },
    {
        icon: <Search className="h-12 w-12 text-[#F97316]" />,
        title: "Advanced Search & Filtering",
        description: "Find exactly what you're looking for with our powerful search and filtering system. Save time, find more."
    },
    {
        icon: <Truck className="h-12 w-12 text-[#10B981]" />,
        title: "Real-time Tracking & Delivery",
        description: "Track your orders in real-time and enjoy lightning-fast delivery options to get your products ASAP."
    },
    {
        icon: <ShieldCheck className="h-12 w-12 text-[#8b5CF6]" />,
        title: "Secure Payments",
        description: "Multiple payment options with bank-level security protocols to keep your financial information safe."
    },
    {
        icon: <PieChart className="h-12 w-12 text-[#3571bb]" />,
        title: "Smart Recommendations",
        description: "Our AI-powered recommendation engine suggests products you'll love based on your preferences."
    }
];

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-xl shadow-lg card-hover"
        >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
        </motion.div>
    );
};

const FeaturesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="features" className="py-16 md:py-24 bg-gray-50 overflow-hidden rounded-xl px-4">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Powerful Features For Sellers & Buyers</h2>
                    <p className="text-xl text-gray-600">
                        HiakriHub offers a comprehensive set of features designed to empower sellers
                        and provide buyers with an exceptional shopping experience.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;