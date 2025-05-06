import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./Components/Pages/NotFoundPage/NotFound";
import ProductsPage from "./Customer/Components/Pages/Products/ProductsPage";
import ProductDetailsWrapper from "./Customer/Components/Pages/ProductDetails/ProductDetailsWrapper";
import WishlistPage from "./Customer/Components/Pages/WhishlistPage/WhishlistPage";
import Navbar from "./Customer/Components/Layout/Navbar/Navbar";
import UserProfile from "./Customer/Components/Pages/Profile/UserProfile";
import UserCheckoutPage from "./Customer/Components/Pages/CartPage/UserCheckoutPage";
import Cart from "./Customer/Components/Pages/CartPage/Cart";
import UserAddress from "./Customer/Components/Pages/CartPage/UserAddress";
import UserOrderPayment from "./Customer/Components/Pages/CartPage/UserOrderPayment";
import Confirmation from "./Customer/Components/Pages/CartPage/Confirmation";
import Index from "./Customer/Components/Pages/Home/Index";
import { ThemeProvider } from "./context/theme-provider";
import { use, useEffect, useState } from "react";
import SellerIndex from "./Seller/SellerIndex";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/Store";
import CustomerLogin from "./Customer/Components/Pages/auth/CustomerLogin";
import CustomerSignup from "./Customer/Components/Pages/auth/CustomerSignup";
// import { QueryClientProvider } from "@tanstack/react-query";

function AppWrapper() {  

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');

        if (element) {
          const offset = 80; // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<CustomerSignup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/products/*" element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductDetailsWrapper />} />
        <Route path="/user/wishlist" element={<WishlistPage />} />
        <Route path="/user/*" element={<UserProfile />} />
        <Route path="/my/" element={<UserCheckoutPage />}>
          <Route path="cart" element={<Cart />} />
          <Route path="address" element={<UserAddress />} />
          <Route path="payment" element={<UserOrderPayment />} />
          <Route path="confirmation" element={<Confirmation />} />
        </Route>
        <Route path="/seller/*" element={<SellerIndex />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    // <QueryClientProvider>
    <Provider store={store}>
      <PersistGate loading={<div className="w-full h-[100vh] flex items-center justify-center">Loading...</div>} persistor={persistor}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <BrowserRouter>
            <AppWrapper />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
    // </QueryClientProvider>
  );
}

export default App;
