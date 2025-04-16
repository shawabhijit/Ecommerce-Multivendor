import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '../../../../../../Components/ui/button';
import { Store, ChevronRight } from 'lucide-react';

const VendorCTASection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="join" className="py-16 md:py-24 bg-[#3571bb] text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6">
                            Start Selling on HiakriHub Today
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-xl mb-8 text-blue-100">
                            Join thousands of successful sellers and reach millions of customers.
                            Our platform provides everything you need to grow your business online.
                        </motion.p>

                        <motion.ul variants={containerVariants} className="space-y-4 mb-8">
                            {[
                                "Simple seller onboarding in minutes",
                                "Powerful dashboard to manage your products",
                                "Advanced analytics to track your performance",
                                "Dedicated seller support team"
                            ].map((point, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-center"
                                >
                                    <ChevronRight className="h-5 w-5 mr-2 text-blue-300" />
                                    <span>{point}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div variants={itemVariants}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block"
                            >
                                <Button
                                    className="bg-white text-[#3571bb] hover:bg-blue-50 cursor-pointer transition-colors py-6 px-8 text-lg font-medium inline-flex items-center gap-2"
                                >
                                    <Store className="h-5 w-5" />
                                    Become a Seller
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="bg-white p-8 rounded-xl text-gray-800"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center">Get Started Now</h3>

                        <form className="space-y-4">


                            <div className='flex items-center'>
                                <span className='border-b py-3 text-sm text-gray-300'>+91</span>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1"></label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none text-sm"
                                    placeholder="- Enter your 10 Digits Number"
                                />
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full"
                            >
                                <Button className="w-full bg-[#3571bb] text-white hover:bg-[#1D4ED8] py-6 text-lg cursor-pointer">
                                    Register as a Seller
                                </Button>
                            </motion.div>

                            <p className="text-sm text-gray-500 text-center mt-4">
                                By registering, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default VendorCTASection;