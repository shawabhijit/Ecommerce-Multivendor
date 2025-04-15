import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Smartphone, ShoppingBag, Utensils, Home, Shirt, Book, Heart, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
    {
        icon: <Smartphone className="h-10 w-10" />,
        name: "Electronics",
        count: "25,000+ Products",
        path: "/products/electronics"
    },
    {
        icon: <Shirt className="h-10 w-10" />,
        name: "Fashion",
        count: "18,000+ Products",
        path: "/products/fashion"
    },
    {
        icon: <Home className="h-10 w-10" />,
        name: "Home & Furniture",
        count: "12,000+ Products",
        path: "/products/home-furniture"
    },
    {
        icon: <Utensils className="h-10 w-10" />,
        name: "Groceries",
        count: "8,000+ Products",
        path: "/products/groceries"
    },
    {
        icon: <Book className="h-10 w-10" />,
        name: "Books & Media",
        count: "15,000+ Products",
        path: "/products/media"
    },
    {
        icon: <Heart className="h-10 w-10" />,
        name: "Health & Beauty",
        count: "10,000+ Products",
        path: "/products/health-beauty"
    },
    {
        icon: <Laptop className="h-10 w-10" />,
        name: "Computers",
        count: "7,000+ Products",
        path: "/products/computers"
    },
    {
        icon: <ShoppingBag className="h-10 w-10" />,
        name: "All Categories",
        count: "View All",
        path: "/products"
    }
];

const CategoryCard = ({ category, index, onClick }: { category: any, index: number, onClick?: () => void }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            className="category-card"
            onClick={onClick}
        >
            <div className="flex flex-col items-center">
                <div className="mb-4 bg-hiakri/10 p-4 rounded-full">
                    {category.icon}
                </div>
                <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
            </div>
        </motion.div>
    );
};

const CategoriesSection = () => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="categories" className="section-padding">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Shop By Category</h2>
                    <p className="text-xl text-gray-600">
                        Browse thousands of products across our most popular categories.
                        Whatever you're looking for, we've got it.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <CategoryCard
                            onClick={() => {
                                if (category.name == "All Categories") {
                                    navigate("/products")
                                }
                                else {
                                    navigate("/products", { state: { selecteedCategory: category.name } })
                                }
                            }} key={index} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;