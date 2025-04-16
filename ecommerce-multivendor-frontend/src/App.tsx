import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./Components/Pages/NotFoundPage/NotFound"
import ProductsPage from "./Customer/Components/Pages/Products/ProductsPage"
import ProductDetailsWrapper from "./Customer/Components/Pages/ProductDetails/ProductDetailsWrapper"
import WishlistPage from "./Customer/Components/Pages/WhishlistPage/WhishlistPage"
import Navbar from "./Customer/Components/Layout/Navbar/Navbar"
import UserProfile from "./Customer/Components/Pages/Profile/UserProfile"
import UserCheckoutPage from "./Customer/Components/Pages/CartPage/UserCheckoutPage"
import Cart from "./Customer/Components/Pages/CartPage/Cart"
import UserAddress from "./Customer/Components/Pages/CartPage/UserAddress"
import UserOrderPayment from "./Customer/Components/Pages/CartPage/UserOrderPayment"
import Confirmation from "./Customer/Components/Pages/CartPage/Confirmation"
import Index from "./Customer/Components/Pages/Home/Index"
import { ThemeProvider } from "./context/theme-provider"
import { SellerSignup } from "./Seller/auth/SellerSignup"
// import {QueryClintProvider} from "@tanstack/react-query"


function App() {

  const isLogedin = true;

  return (
    // <QueryClintProvider>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar isLogedin={isLogedin} />
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
          <Route path="/seller/signup" element={<SellerSignup />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
      
    // </QueryClintProvider>
    
  )
}

export default App
