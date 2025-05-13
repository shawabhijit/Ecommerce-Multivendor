import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScroll, useTransform } from 'motion/react';
import { motion } from "motion/react"
import { cn } from '../../../../lib/utils';
import { Button } from "../../../../Components/ui/button"
import { Heart, Lightbulb, Menu, Moon, NutOffIcon, Search, ShoppingCart, Sun, User, X } from 'lucide-react';
import { Input } from '../../../../Components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../../../Components/ui/dropdown-menu';
import { useTheme } from '../../../../context/theme-provider';
import { useAppDispatch } from '../../../../app/Store';
import { logout } from '../../../../app/authSlice/CustomerAuthSlice';


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

const Navbar = ({ isLogedin }: any) => {

    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';
    const dispatch = useAppDispatch();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredResults, setFilteredResults] = useState<string[]>([]);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate();

    const { scrollY } = useScroll()
    const headerBackground = useTransform(scrollY, [0, 50], [isDark ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"])
    const headerShadow = useTransform(scrollY, [0, 50], ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 6px rgba(0, 0, 0, 0.1)"])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [searchValue]);

    const handleLogout = async () => {
        await dispatch(logout());
    }

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ",
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
                            className="text-3xl font-bold hiakri-orange"
                        >
                            Hikari<span className="hiakri-primary">Hub</span>
                        </motion.div>
                    </Link>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>

                    {/* Desktop Navigation */}
                    {/* <div className="hidden md:flex items-center flex-1 mx-6"> */}
                    <div>
                        {
                            isLogedin ? (
                                <nav className="hidden md:flex items-center space-x-5 font-semibold">
                                    <a onClick={() => navigate("/products", { state: { selecteedCategory: "Electronics" } })} className="text-gray-700 cursor-pointer hover:text-[#F97316] transition-colors">Electronics</a>

                                    <a onClick={() => navigate("/products", { state: { selecteedCategory: "Fashion" } })}  className="text-gray-700 cursor-pointer hover:text-[#F97316] transition-colors">Fashion</a>

                                    <a onClick={() => navigate("/products", { state: { selecteedCategory: "Home & kitchen" } })}  className="text-gray-700 cursor-pointer hover:text-[#F97316] transition-colors">Home & kitchen</a>

                                    <a onClick={() => navigate("/products", { state: { selecteedCategory: "Books & Media" } })}  className="text-gray-700 cursor-pointer hover:text-[#F97316] transition-colors">Books</a>

                                    <a onClick={() => navigate("/products", { state: { selecteedCategory: "Health & Beauty" } })} className="text-gray-700 cursor-pointer hover:text-[#F97316] transition-colors">Beauty</a>

                                    <a onClick={() => navigate("/products", { state: { selecteedCategory: "Sports" } })} className="text-gray-700 cursor-pointer hover:text-[#F97316] transition-colors">Sports</a>
                                </nav>
                            ) : (
                                <nav className="hidden md:flex items-center space-x-5 font-semibold">
                                    <a href="#features" className="text-gray-700 hover:text-[#F97316] transition-colors">Features</a>
                                    <a href="#categories" className="text-gray-700 hover:text-[#F97316] transition-colors">Categories</a>
                                    <a href="#testimonials" className="text-gray-700 hover:text-[#F97316] transition-colors">Testimonials</a>
                                    <a href="#join" className="text-gray-700 hover:text-[#F97316] transition-colors">Become a Seller</a>
                                </nav>
                            )
                        }
                    </div>
                    {/* </div> */}

                    {/* User Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="relative w-[350px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                                <Input
                                    placeholder="Search Categories or Products"
                                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-md"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </div>
                            {
                                filteredResults && (
                                    <div className="absolute top-0 mt-10 bg-white w-full rounded-md">
                                        {
                                            filteredResults.map((item, index) => (
                                                <div
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        console.log("Selected:", item);
                                                        setSearchValue(item);
                                                        setIsOpenSearch(false);
                                                    }}
                                                    key={index}
                                                >
                                                    {item}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>

                        <div>
                            {
                                isLogedin ? (
                                    <div className='flex gap-5'>
                                        <div className="relative"
                                            onMouseEnter={() => setIsAccountOpen(true)}
                                            onMouseLeave={() => setIsAccountOpen(false)}
                                        >
                                            <DropdownMenu open={isAccountOpen}>
                                                <DropdownMenuTrigger asChild>
                                                    <div className="flex flex-col gap-y-[-1] items-center cursor-pointer">
                                                        <User className="h-5 w-5" />
                                                        <span className="hidden sm:inline text-sm font-bold">Account</span>
                                                        {/* <ChevronDown className="h-4 w-4" /> */}
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-[200px]">
                                                    <DropdownMenuItem onClick={() => navigate("/user/profile?tab=profile")}>My Profile</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => navigate("/user/profile?tab=orders")}>Orders</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => navigate("/user/wishlist")}>Wishlist</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setTheme(isDark ? "light" : "dark")}>
                                                        {
                                                            isDark ? (
                                                                <Sun />
                                                            ) : (
                                                                <Moon />
                                                            )
                                                        }
                                                        {
                                                            isDark ? "Light" : "Dark"
                                                        }
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div onClick={() => navigate("/user/wishlist")} className="relative flex flex-col items-center justify-center gap-y-[-1] cursor-pointer">
                                            <Heart className="h-5 w-5 text-red-600" />
                                            <span className="hidden sm:inline text-sm font-bold">Whishlist</span>
                                        </div>

                                        <div onClick={() => navigate("/my/cart")} className="relative flex flex-col cursor-pointer items-center justify-center gap-[-1]">
                                            <ShoppingCart className="h-5 w-5 " />
                                            <span className="hidden sm:inline ml-1 text-sm font-bold ">Cart</span>
                                            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                0
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <Button onClick={() => navigate("/login")} variant="default" className='bg-[#3571bb] cursor-pointer hover:bg-[#1D4ED8]'>
                                            Sign In
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Mobile Search - shown below header on mobile */}
                <div className="md:hidden py-2 pb-3">
                    <div className="flex w-full relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hiakri/50 w-full"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-4 border-t"
                    >
                        <nav className="flex flex-col space-y-4">
                            <Link to="/profile" className="flex items-center px-2 py-1 hover:bg-gray-100 rounded">
                                <User className="h-5 w-5 mr-2" />
                                My Profile
                            </Link>
                            <Link to="/orders" className="flex items-center px-2 py-1 hover:bg-gray-100 rounded">
                                Orders
                            </Link>
                            <Link to="/wishlist" className="flex items-center px-2 py-1 hover:bg-gray-100 rounded">
                                Wishlist
                            </Link>
                            <Link to="/cart" className="flex items-center px-2 py-1 hover:bg-gray-100 rounded">
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Cart
                                <span className="ml-auto bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    3
                                </span>
                            </Link>
                            <div className="pt-2 border-t">
                                <Button variant="outline" className="w-full">
                                    Logout
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </div>
        </motion.header>
    )
}

export default Navbar