import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Smartphone, ShoppingBag, Utensils, Home, Shirt, Book, Heart, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
    {
        icon: <Smartphone className="h-10 w-10" />,
        name: "Electronics",
        count: "25,000+ Products",
        path: "/products/electronics",
        image: "https://res.cloudinary.com/dvkvr88db/image/upload/v1746792994/electronics-shopping-concept_488220-34943_umlmcz.webp"
    },
    {
        icon: <Shirt className="h-10 w-10" />,
        name: "Fashion",
        count: "18,000+ Products",
        path: "/products/fashion",
        image:"https://res.cloudinary.com/dvkvr88db/image/upload/v1746792993/hangers-1850082_640_ottkhm.webp"
    },
    {
        icon: <Home className="h-10 w-10" />,
        name: "Home & Furniture",
        count: "12,000+ Products",
        path: "/products/home-furniture",
        image:"https://res.cloudinary.com/dvkvr88db/image/upload/v1746792993/image101980-65ca84ab89f31_amd2c9.webp"
    },
    {
        icon: <Utensils className="h-10 w-10" />,
        name: "Sports & Outdoors",
        count: "8,000+ Products",
        path: "/products/sports-outdoors",
        image:"https://res.cloudinary.com/dvkvr88db/image/upload/v1747737523/cycling-sport-feet-on-pedal-of-bike_g8kft0.webp"
    },
    {
        icon: <Book className="h-10 w-10" />,
        name: "Books & Media",
        count: "15,000+ Products",
        path: "/products/media",
        image:"https://res.cloudinary.com/dvkvr88db/image/upload/v1746792991/pile-books-bookstore_23-2148213789_cdcjfc.webp"
    },
    {
        icon: <Heart className="h-10 w-10" />,
        name: "Health & Beauty",
        count: "10,000+ Products",
        path: "/products/health-beauty",
        image:"https://res.cloudinary.com/dvkvr88db/image/upload/v1746792991/spa-beauty-care-concept-beautiful-various-products-spa-set-care-spa-products-view-from_1220-1521_etpkkh.webp"
    },
    {
        icon: <Laptop className="h-10 w-10" />,
        name: "Computers",
        count: "7,000+ Products",
        path: "/products/computers",
        image:"https://res.cloudinary.com/dvkvr88db/image/upload/v1746792991/flx-1138080-DesktopCatRedesign-nav3_1-Monitors-c0e93e80-7dd5-4579-bee1-ae59c8436de4_owbrbq.webp"
    },
    {
        icon: <ShoppingBag className="h-10 w-10" />,
        name: "All Categories",
        count: "View All",
        path: "/products",
        image:"https://res.cloudinary.com/dvkvr88db/image/upload/v1746792990/shopping-cart-3154149_640_di7gfg.webp"
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
            transition={{ duration: 0.2, delay: index * 0.1 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            className="relative md:h-[200px] rounded-lg shadow-md text-center p-6 transition-all duration-100 hover:shadow-lg hover:translate-y-1 cursor-pointer overflow-hidden flex justify-center items-end"
            onClick={onClick}
        >
            {/* Blurred Background */}
            <div
                className="absolute inset-0 z-0 filter blur-[1px] brightness-75"
                style={{
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            />

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center text-white">
                {/* <div className="mb-4 bg-white/20 p-4 rounded-full backdrop-blur-sm">
                    {category.icon}
                </div> */}
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm">{category.count}</p>
            </div>
        </motion.div>
    );
};

const CategoriesSection = () => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="categories" className="py-16 md:py-24">
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