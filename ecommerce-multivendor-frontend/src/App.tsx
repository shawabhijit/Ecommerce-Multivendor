
import { Button, ThemeProvider } from "@mui/material"
import Navbar from "./Customer/Components/Navbar/Navbar"
import { customTheme } from "./Theme/CustomTheme"
import Home from "./Customer/Components/Pages/Home/Home"
import Product from "./Customer/Components/Pages/Product/Product"
import ProductDetails from "./Customer/Components/Pages/ProductDetails/ProductDetails"
import Review from "./Customer/Components/Pages/Review/Review"
import Cart from "./Customer/Components/Pages/Cart/Cart"
import Checkout from "./Customer/Components/Pages/Checkout/Checkout"
import Account from "./Customer/Components/Pages/Account/Account"
import { Route, Routes } from "react-router-dom"
import BecomeSeller from "./Seller/Pages/BecomeSeller/BecomeSeller"
import SellerDashboard from "./Seller/Pages/SellerDashBoard/SellerDashboard"

function App() {


  return (
    <>
      
        <ThemeProvider theme={customTheme}>
          <div>
            
            {/* <Home /> */}
            {/* <Product /> */}
            {/* <ProductDetails /> */}
            {/* <Review /> */}
            {/* <Cart /> */}
            {/* <Checkout /> */}
            {/* <Account /> */}
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:category" element={<Product />} />
              <Route path="/reviews/:productId" element={<Review />} />
              <Route path="/product-details/:categoryId/:name/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account/*" element={<Account />} />
              <Route path="/become-seller" element={<BecomeSeller />} />
              <Route path="/seller/*" element={<SellerDashboard />} />
            </Routes>
          </div>
        </ThemeProvider>

    </>
  )
}

export default App
