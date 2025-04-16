import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Send, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl font-bold mb-6"
                        >
                            <span className="text-hiakri-orange">Hiakri</span>Hub
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-gray-400 mb-6"
                        >
                            Your one-stop multi-vendor marketplace for all your shopping needs.
                            Join millions of happy customers and thousands of successful sellers.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex space-x-4"
                        >
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </motion.div>
                    </div>

                    <div>
                        <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg font-semibold mb-6"
                        >
                            Quick Links
                        </motion.h4>
                        <motion.ul
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-3"
                        >
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a>
                            </li>
                            <li>
                                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                            </li>
                            <li>
                                <a href="#categories" className="text-gray-400 hover:text-white transition-colors">Categories</a>
                            </li>
                            <li>
                                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a>
                            </li>
                            <li>
                                <a href="#join" className="text-gray-400 hover:text-white transition-colors">Become a Seller</a>
                            </li>
                        </motion.ul>
                    </div>

                    <div>
                        <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg font-semibold mb-6"
                        >
                            Customer Service
                        </motion.h4>
                        <motion.ul
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-3"
                        >
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Track Your Order</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping & Delivery</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Refunds</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
                            </li>
                        </motion.ul>
                    </div>

                    <div>
                        <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg font-semibold mb-6"
                        >
                            Contact Information
                        </motion.h4>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 text-hiakri mr-3 mt-1" />
                                <p className="text-gray-400">
                                    123 Commerce Street, Tech Valley, CA 94107, United States
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-hiakri mr-3" />
                                <p className="text-gray-400">+1 (555) 123-4567</p>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-hiakri mr-3" />
                                <p className="text-gray-400">support@hiakrihub.com</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-6"
                        >
                            <p className="text-gray-400 mb-3">Subscribe to our newsletter</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-hiakri/50 w-full"
                                />
                                <button className="bg-hiakri text-white px-4 py-2 rounded-r-md hover:bg-hiakri-dark transition-colors">
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-gray-400 text-sm mb-4 md:mb-0"
                        >
                            © {currentYear} HiakriHub. All rights reserved.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex flex-wrap gap-4 text-sm text-gray-400"
                        >
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Seller Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;