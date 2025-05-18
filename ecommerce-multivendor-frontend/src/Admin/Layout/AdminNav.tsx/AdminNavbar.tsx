import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScroll, useTransform } from 'motion/react';
import { motion } from "motion/react"
import { Button } from "../../../Components/ui/button"
import { Badge, Bell, Home, LogOut, Menu, Moon, Settings, ShoppingCart, Store, Sun, User, User2Icon, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../../../Components/ui/avatar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../../Components/ui/dropdown-menu';
import { useTheme } from '../../../context/theme-provider';
import { useAppDispatch, useAppSelecter } from '../../../app/Store';
import { logout } from '../../../app/Admin/AdminSlice';


const AdminNavbar = () => {

    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { isLoggedIn: isLogedin } = useAppSelecter((state) => state.admin);

    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const { scrollY } = useScroll()
    const headerBackground = useTransform(scrollY, [0, 50], [isDark ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"])
    const headerShadow = useTransform(scrollY, [0, 50], ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 6px rgba(0, 0, 0, 0.1)"])

    const handleLogout = () => {
        console.log("Logged out");
        dispatch(logout())
    }

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: Home },
        { name: "ALl Customers", href: "/admin/customers", icon: User2Icon },
        { name: "All Vendors", href: "/admin/sellers", icon: Store },
    ]

    console.log(isAccountOpen)
    return (
        <motion.header
            className={
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-1"}
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
                                                        <Avatar className="h-9 w-9 flex items-center justify-center">
                                                            <AvatarImage src={""} />
                                                            <AvatarFallback className='text-2xl font-bold bg-[#505050] text-white'>
                                                                {"AB"}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className='w-[200px] absolute left-[-150px] top-2'>
                                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Settings className="mr-2 h-4 w-4" />
                                                        <span>Settings</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={handleLogout}>
                                                        <LogOut className="mr-2 h-4 w-4" />
                                                        <span>Logout</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
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
                                        <Button onClick={() => navigate("/admin/login")} variant="default" className='bg-[#3571bb] cursor-pointer hover:bg-[#1D4ED8]'>
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

export default AdminNavbar