import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScroll, useTransform } from 'motion/react';
import { motion } from "motion/react"
import { cn } from '../../lib/utils';
import { Button } from "../../Components/ui/button"
import { Badge, BarChart3, Bell, CreditCard, Home, LogOut, Menu, Moon, Package, Settings, ShoppingCart, Sun, User, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/ui/avatar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../Components/ui/dropdown-menu';
import { useTheme } from '../../context/theme-provider';
import { useAppDispatch, useAppSelecter } from '../../app/Store';
import { logout } from '../../app/authSlice/sellerAuthSlice';
import { fetchSellerProfile } from '../../app/seller/SellerSlice';


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

const SellerNav = ({ isLogedin , sellerInfo }: any) => {

    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const sellerProfile = useAppSelecter((state) => state.fetchSeller.profile)

    console.log('selller Profile info :', sellerProfile)


    const [isScrolled, setIsScrolled] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredResults, setFilteredResults] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false)

    const { scrollY } = useScroll()
    const headerBackground = useTransform(scrollY, [0, 50], [isDark ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"])
    const headerShadow = useTransform(scrollY, [0, 50], ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 6px rgba(0, 0, 0, 0.1)"])

    const handleLogout = () => {
        console.log("Logged out");
        dispatch(logout())
    }

    console.log("seller Image :", sellerProfile?.businessDetails?.logo)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        if (searchValue.trim() === "") {
            setFilteredResults([]);
            return;
        }

        const filtered = products.filter((item) =>
            item.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredResults(filtered);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [searchValue]);

    

    // console.log("Seller Profile fetch suucessfully ,  Response:", response);

    const navigation = [
        { name: "Dashboard", href: "/seller", icon: Home },
        { name: "Products", href: "/seller/products", icon: Package },
        { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
        { name: "Analytics", href: "/seller/analytics", icon: BarChart3 },
        { name: "Earnings", href: "/seller/earnings", icon: CreditCard },
    ]

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
                    <div className='pl-5'>
                        <nav className="hidden md:flex items-center space-x-5 font-semibold gap-3">
                            {navigation.map((item) => {
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`group flex items-center text-sm font-medium rounded-md transition-all ${false ? "bg-primary text-white" : "text-gray-700 hover:text-[#F97316]"
                                            }`}
                                    >
                                        <item.icon
                                            className={`mr-3 h-5 w-5 ${false ? "text-white" : "text-gray-500 group-hover:text-[#3B82F6]"}`}
                                        />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                    {/* </div> */}

                    {/* User Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="relative w-[350px]">
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
                                        <Button variant="ghost" size="icon" className="relative">
                                            <Bell className="h-5 w-5" />
                                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 ">3</Badge>
                                        </Button>
                                        <div className="relative"
                                            onMouseEnter={() => setIsAccountOpen(true)}
                                            onMouseLeave={() => setIsAccountOpen(false)}
                                        >
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="rounded-full">
                                                        <Avatar className="h-10 w-10 flex items-center justify-center">
                                                            <AvatarImage src="/placeholder.svg" />
                                                            <AvatarFallback className='text-2xl font-bold bg-[#505050] text-white'>
                                                                {sellerInfo?.fullName.substring(0, 1).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className='w-[200px] absolute left-[-150px] top-2'>
                                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => navigate("/seller/info/1")}>
                                                        <User className="mr-2 h-4 w-4" />
                                                        <span>Profile</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Settings className="mr-2 h-4 w-4" />
                                                        <span>Settings</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={handleLogout}>
                                                        <LogOut className="mr-2 h-4 w-4" />
                                                        <span>Logout</span>
                                                    </DropdownMenuItem>
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
                                    </div>
                                ) : (
                                    <div>
                                        <Button variant="default" className='bg-[#3571bb] cursor-pointer hover:bg-[#1D4ED8]'>
                                            Sign In
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
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

export default SellerNav