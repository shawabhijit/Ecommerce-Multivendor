import SellerNav from './layout/SellerNav';
import { SellerDashboard } from './dashboard/SellerDashboard';
import { OrderManagement } from './orders/OrderManagement';
import { ProductManagement } from './products/ProductsManagement';
import { AddEditProduct } from './products/AddEditProducts/SellerAddProduct';
import SellerEarnings from './earnings/SellerEarnings';
import SellerAnalytics from './Analytics/SellerAnalytics';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SellerProfile } from './SellerProfile/SellerProfile';
import { SellerSignup } from './auth/SellerSignup';
import { SellerLogin } from './auth/SellerLogin';
import { useAppDispatch, useAppSelecter } from '../app/Store';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { useEffect, useState } from 'react';
import { fetchSellerProfile } from '../app/seller/SellerSlice';



const SellerIndex = () => {

    const { isLoggedIn, loading, error } = useAppSelecter((state) => state.sellers);

    // Define paths where Navbar should be hidden
    const hideNavbarRoutes = ["/seller/signup", "/seller/login",];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
    const dispatch = useAppDispatch();
    const [sellerInfo , setSellerInfo] = useState<any>(null);

    const fetchSellerData = async () => {
        const res = await dispatch(fetchSellerProfile());
        if (res.meta.requestStatus === "fulfilled") {
            setSellerInfo(res.payload);
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetchSellerData();
        }
    }, [isLoggedIn , dispatch]);

    return (
        <>
            {!shouldHideNavbar && <SellerNav isLogedin={isLoggedIn} sellerInfo={sellerInfo} />}
            <main className="flex-grow min-h-screen overflow-hidden">
                <div className="container mx-auto px-4 space-y-8 pb-10 mt-28">
                    <Routes>
                        {/* public routes */}
                        <Route path="signup" element={<SellerSignup />} />
                        <Route path="login" element={<SellerLogin />} />
                        {/* protected routes */}
                        <Route path="/" element={
                            <ProtectedRoute>
                                <SellerDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="orders" element={
                            <ProtectedRoute>
                                <OrderManagement />
                            </ProtectedRoute>
                        } />
                        <Route path="products" element={
                            <ProtectedRoute>
                                <ProductManagement />
                            </ProtectedRoute>
                        } />
                        <Route path="analytics" element={
                            <ProtectedRoute>
                                <SellerAnalytics />
                            </ProtectedRoute>
                        } />
                        <Route path="earnings" element={
                            <ProtectedRoute>
                                <SellerEarnings />
                            </ProtectedRoute>
                        } />
                        <Route path="products/add" element={
                            <ProtectedRoute>
                                <AddEditProduct />
                            </ProtectedRoute>
                        } />
                        <Route path="product/edit/:id" element={
                            <ProtectedRoute>
                                <AddEditProduct />
                            </ProtectedRoute>
                        } />
                        <Route path="info/:id" element={
                            <ProtectedRoute>
                                <SellerProfile />
                            </ProtectedRoute>
                        } />

                        {/* <Route path="*" element={<Navigate to="/seller/login" replace />} /> */}
                    </Routes>
                </div>
            </main >
        </>
    );
};

export default SellerIndex;



// {
//     (!isLoggedIn) ? (
//         <Routes>
//             <Route path="/signup" element={<SellerSignup />} />
//             <Route path="/login" element={<SellerLogin />} />
//         </Routes>
//     ) : (
//         <Routes>
//             <Route path="/" element={<SellerDashboard />} />
//             <Route path="/orders" element={<OrderManagement />} />
//             <Route path="/products" element={<ProductManagement />} />
//             <Route path="/analytics" element={<SellerAnalytics />} />
//             <Route path="/earnings" element={<SellerEarnings />} />
//             <Route path="/products/add" element={<AddEditProduct />} />
//             <Route path="/product/edit/:id" element={<AddEditProduct />} />
//             <Route path="/info/:id" element={<SellerProfile />} />
//         </Routes>
//     )
// }    