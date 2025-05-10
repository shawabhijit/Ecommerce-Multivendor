import React from 'react'
import AuthChecker from './auth/AuthChecker'
import { Route, Routes, useLocation } from 'react-router-dom'
import CustomerLogin from './auth/CustomerLogin'
import CustomerSignup from './auth/CustomerSignup'
import ProtectedRoute from './auth/ProtectedRoute'
import Index from './Home/Index'
import ProductsPage from './Products/ProductsPage'
import ProductDetailsWrapper from './ProductDetails/ProductDetailsWrapper'
import WishlistPage from './WhishlistPage/WhishlistPage'
import UserProfile from './Profile/UserProfile'
import UserCheckoutPage from './CartPage/UserCheckoutPage'
import Cart from './CartPage/Cart'
import UserAddress from './CartPage/UserAddress'
import UserOrderPayment from './CartPage/UserOrderPayment'
import Confirmation from './CartPage/Confirmation'
import Navbar from '../Layout/Navbar/Navbar'
import { useAppSelecter } from '../../../app/Store'

const CustomerIndex = () => {
    const { isLoggedIn } = useAppSelecter((state) => state.customers);
    const location = useLocation();

    // Routes where navbar should be hidden
    const hideSellerNavbarRoutes = ["/seller/signup", "/seller/login"];
    const hideNavbarRoutes = ["/login", "/signup"];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname) &&
        !hideSellerNavbarRoutes.includes(location.pathname);

    return (
        <AuthChecker>
            {!shouldHideNavbar && <Navbar isLogedin={isLoggedIn} />}
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<CustomerLogin />} />
                <Route path="/signup" element={<CustomerSignup />} />

                {/* Home route */}
                <Route path="" element={<Index />} />
                <Route path="/products/*" element={<ProductsPage />} />
                <Route path="product/:id" element={<ProductDetailsWrapper />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/user/wishlist" element={<WishlistPage />} />
                    <Route path="/user/*" element={<UserProfile />} />
                    <Route path="/my/" element={<UserCheckoutPage />}>
                        <Route path="cart" element={<Cart />} />
                        <Route path="address" element={<UserAddress />} />
                        <Route path="payment" element={<UserOrderPayment />} />
                        <Route path="confirmation/:orderId" element={<Confirmation />} />
                    </Route>
                </Route>
            </Routes>
        </AuthChecker>
    )
}

export default CustomerIndex