import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScroll, useTransform } from 'motion/react';
import { motion, AnimatePresence } from "motion/react";
import { cn } from '../../../../lib/utils';
import { Button } from "../../../../Components/ui/button";
import {
    Heart,
    Menu,
    Moon,
    Search,
    ShoppingCart,
    Sun,
    User,
    X,
    ChevronRight
} from 'lucide-react';
import { Input } from '../../../../Components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../../../../Components/ui/dropdown-menu';
import { useTheme } from '../../../../context/theme-provider';
import { useAppDispatch } from '../../../../app/Store';
import { logout, logoutUser } from '../../../../app/authSlice/CustomerAuthSlice';

const products = [
    "Mobile",
    "Mobile Cover",
    "Mobile Charger",
    "Laptop",
    "Earbuds",
    "Smartwatch",
    "Camera",
    "Mobile Stand",
    "Mobile Holder"
];

const Navbar = ({ isLogedin }) => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // State management
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredResults, setFilteredResults] = useState<string[]>([]);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Animation hooks
    const { scrollY } = useScroll();
    const headerBackground = useTransform(
        scrollY,
        [0, 50],
        [isDark ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"]
    );
    const headerShadow = useTransform(
        scrollY,
        [0, 50],
        ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 6px rgba(0, 0, 0, 0.1)"]
    );

    // Handle scrolling effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle search functionality
    useEffect(() => {
        if (searchValue.trim() === "") {
            setFilteredResults([]);
            setIsOpenSearch(false);
            return;
        }

        const filtered = products.filter((item) =>
            item.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredResults(filtered);
        setIsOpenSearch(filtered.length > 0);
    }, [searchValue]);

    // Handle search selection
    const handleSearchSelection = (item) => {
        setSearchValue(item);
        setIsOpenSearch(false);
        // Navigate to search results or product page
        navigate(`/search?query=${encodeURIComponent(item)}`);
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            dispatch(logout());
            setIsOpen(false); // Close mobile menu after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Handle category navigation
    const navigateToCategory = (category) => {
        navigate("/products", { state: { selecteedCategory: category } });
        setIsOpen(false); // Close mobile menu after navigation
    };

    // Categories for both mobile and desktop
    const categories = [
        { name: "Electronics", value: "Electronics" },
        { name: "Fashion", value: "Fashion" },
        { name: "Home & Kitchen", value: "Home & kitchen" },
        { name: "Books", value: "Books & Media" },
        { name: "Beauty", value: "Health & Beauty" },
        { name: "Sports", value: "Sports" }
    ];

    // Landing page links
    const landingPageLinks = [
        { name: "Features", href: "#features" },
        { name: "Categories", href: "#categories" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Become a Seller", href: "#join" }
    ];

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-white shadow-md py-1" : "bg-transparent py-2"
            )}
            style={{
                backgroundColor: headerBackground,
                boxShadow: headerShadow,
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-2xl md:text-3xl font-bold hiakri-orange"
                        >
                            Hikari<span className="hiakri-primary">Hub</span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block flex-grow mx-6">
                        {isLogedin ? (
                            <nav className="flex items-center justify-center space-x-5 font-semibold">
                                {categories.map((category) => (
                                    <a
                                        key={category.value}
                                        onClick={() => navigateToCategory(category.value)}
                                        className="text-gray-700 cursor-pointer hover:text-[#F97316] transition-colors"
                                    >
                                        {category.name}
                                    </a>
                                ))}
                            </nav>
                        ) : (
                            <nav className="flex items-center justify-center space-x-5 font-semibold">
                                {landingPageLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="text-gray-700 hover:text-[#F97316] transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </nav>
                        )}
                    </div>

                    {/* Desktop Search and User Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Search */}
                        <div className="relative w-[250px] lg:w-[350px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                                <Input
                                    placeholder="Search Categories or Products"
                                    className="pl-10 pr-4 py-2 text-sm bg-gray-100 rounded-md placeholder:text-sm placeholder:text-gray-400"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </div>
                            {isOpenSearch && filteredResults.length > 0 && (
                                <div className="absolute top-0 mt-10 bg-white w-full rounded-md shadow-lg z-50">
                                    {filteredResults.map((item, index) => (
                                        <div
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSearchSelection(item)}
                                            key={index}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* User Actions for Desktop */}
                        {isLogedin ? (
                            <div className="flex items-center gap-4">
                                {/* Account Dropdown */}
                                <div className="relative"
                                    onMouseEnter={() => setIsAccountOpen(true)}
                                    onMouseLeave={() => setIsAccountOpen(false)}
                                >
                                    <DropdownMenu open={isAccountOpen}>
                                        <DropdownMenuTrigger asChild>
                                            <div className="flex flex-col items-center cursor-pointer">
                                                <User className="h-5 w-5" />
                                                <span className="text-xs font-medium">Account</span>
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[200px]">
                                            <DropdownMenuItem onClick={() => navigate("/user/profile?tab=profile")}>My Profile</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate("/user/profile?tab=orders")}>Orders</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate("/user/wishlist")}>Wishlist</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTheme(isDark ? "light" : "dark")}>
                                                {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                                                {isDark ? "Light Mode" : "Dark Mode"}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Wishlist */}
                                <div
                                    onClick={() => navigate("/user/wishlist")}
                                    className="flex flex-col items-center cursor-pointer"
                                >
                                    <Heart className="h-5 w-5 text-red-600" />
                                    <span className="text-xs font-medium">Wishlist</span>
                                </div>

                                {/* Cart */}
                                <div
                                    onClick={() => navigate("/my/cart")}
                                    className="relative flex flex-col items-center cursor-pointer"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="text-xs font-medium">Cart</span>
                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        0
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={() => navigate("/login")}
                                variant="default"
                                className="bg-[#3571bb] hover:bg-[#1D4ED8]"
                            >
                                Sign In
                            </Button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-3">
                        {/* Cart icon for quick access on mobile */}
                        {isLogedin && (
                            <div
                                onClick={() => navigate("/my/cart")}
                                className="relative cursor-pointer"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    0
                                </span>
                            </div>
                        )}

                        {/* Menu toggle button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu - Full Screen Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "100vh" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden fixed inset-0 bg-white top-16 z-50 overflow-y-auto"
                            style={{ zIndex: 49 }}
                        >
                            {/* Mobile Search */}
                            <div className="p-4 border-b border-gray-200">
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                                    <Input
                                        placeholder="Search Categories or Products"
                                        className="pl-10 pr-4 py-2 bg-gray-100 rounded-md w-full"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                                {isOpenSearch && filteredResults.length > 0 && (
                                    <div className="bg-white w-full rounded-md mt-1 shadow-sm">
                                        {filteredResults.map((item, index) => (
                                            <div
                                                className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                                                onClick={() => handleSearchSelection(item)}
                                                key={index}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Navigation Links */}
                            <nav className="p-4">
                                {isLogedin ? (
                                    <>
                                        <div className="mb-4">
                                            <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Categories</h3>
                                            <div className="space-y-3">
                                                {categories.map((category) => (
                                                    <div
                                                        key={category.value}
                                                        className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                                        onClick={() => navigateToCategory(category.value)}
                                                    >
                                                        <span className="text-gray-700">{category.name}</span>
                                                        <ChevronRight className="h-4 w-4 text-gray-500" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-4">
                                            <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Navigation</h3>
                                            <div className="space-y-3">
                                                {landingPageLinks.map((link) => (
                                                    <a
                                                        key={link.href}
                                                        href={link.href}
                                                        className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <span className="text-gray-700">{link.name}</span>
                                                        <ChevronRight className="h-4 w-4 text-gray-500" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* User Account Section */}
                                {isLogedin && (
                                    <>
                                        <div className="mt-6 mb-4">
                                            <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Account</h3>
                                            <div className="space-y-3">
                                                <div
                                                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                                    onClick={() => navigate("/user/profile?tab=profile")}
                                                >
                                                    <div className="flex items-center">
                                                        <User className="h-5 w-5 mr-3 text-gray-600" />
                                                        <span>My Profile</span>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-gray-500" />
                                                </div>

                                                <div
                                                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                                    onClick={() => navigate("/user/profile?tab=orders")}
                                                >
                                                    <span className="ml-8">Orders</span>
                                                    <ChevronRight className="h-4 w-4 text-gray-500" />
                                                </div>

                                                <div
                                                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                                    onClick={() => navigate("/user/wishlist")}
                                                >
                                                    <div className="flex items-center">
                                                        <Heart className="h-5 w-5 mr-3 text-red-600" />
                                                        <span>Wishlist</span>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-gray-500" />
                                                </div>

                                                <div
                                                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                                    onClick={() => navigate("/my/cart")}
                                                >
                                                    <div className="flex items-center">
                                                        <ShoppingCart className="h-5 w-5 mr-3 text-gray-600" />
                                                        <span>Cart</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mr-2">
                                                            0
                                                        </span>
                                                        <ChevronRight className="h-4 w-4 text-gray-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Theme Toggle & Logout */}
                                <div className="mt-6 space-y-3">
                                    <div
                                        className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                        onClick={() => setTheme(isDark ? "light" : "dark")}
                                    >
                                        <div className="flex items-center">
                                            {isDark ? (
                                                <Sun className="h-5 w-5 mr-3 text-yellow-500" />
                                            ) : (
                                                <Moon className="h-5 w-5 mr-3 text-gray-600" />
                                            )}
                                            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                                        </div>
                                    </div>

                                    {isLogedin ? (
                                        <div
                                            className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            <span className="text-red-500">Logout</span>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() => {
                                                navigate("/login");
                                                setIsOpen(false);
                                            }}
                                            variant="default"
                                            className="w-full bg-[#3571bb] hover:bg-[#1D4ED8] mt-4"
                                        >
                                            Sign In
                                        </Button>
                                    )}
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
};

export default Navbar;