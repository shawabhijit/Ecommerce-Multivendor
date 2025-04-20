import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import { useEffect } from "react";
import SellerIndex from "./Seller/SellerIndex";
// import { QueryClientProvider } from "@tanstack/react-query";

function AppWrapper() {
  const location = useLocation();
  const isLogedin = false;

  // Define paths where Navbar should be hidden
  const hideNavbarRoutes = ["/seller/login", "/seller/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);


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
      {!shouldHideNavbar && <Navbar isLogedin={isLogedin} />}
      <Routes>
        <Route path="/" element={<Index isLogedin={isLogedin} />} />
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
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </ThemeProvider>
    // </QueryClientProvider>
  );
}

export default App;
