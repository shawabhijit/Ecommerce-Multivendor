import SellerNav from './layout/SellerNav';
import { SellerDashboard } from './dashboard/SellerDashboard';
import { OrderManagement } from './orders/OrderManagement';
import { ProductManagement } from './products/ProductsManagement';
import { AddEditProduct } from './products/AddEditProducts/SellerAddProduct';
import SellerEarnings from './earnings/SellerEarnings';
import SellerAnalytics from './Analytics/SellerAnalytics';
import { Route, Routes } from 'react-router-dom';
import { SellerProfile } from './SellerProfile/SellerProfile';
import { SellerSignup } from './auth/SellerSignup';
import { SellerLogin } from './auth/SellerLogin';



const SellerIndex = ({ isLogedin }) => {

    // Define paths where Navbar should be hidden
    const hideNavbarRoutes = ["/seller/signup", "/seller/login",];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <>
            {!shouldHideNavbar && <SellerNav isLogedin={isLogedin} />}
            <main className="flex-grow min-h-screen overflow-hidden">
                <div className="container mx-auto px-4 space-y-8 pb-10 mt-28">
                    {
                        !isLogedin ? (
                            <Routes>
                                <Route path="/signup" element={<SellerSignup />} />
                                <Route path="/login" element={<SellerLogin />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route path='/' element={<SellerDashboard />} />
                                <Route path='/orders' element={<OrderManagement />} />
                                <Route path='/products' element={<ProductManagement />} />
                                <Route path='/analytics' element={<SellerAnalytics />} />
                                <Route path='/earnings' element={<SellerEarnings />} />
                                <Route path='/products/add' element={<AddEditProduct />} />
                                <Route path='/product/edit/:id' element={<AddEditProduct />} />
                                <Route path='/info/:id' element={<SellerProfile />} />
                            </Routes>
                        )
                    }
                </div>
            </main >
        </>
    );
};

export default SellerIndex;