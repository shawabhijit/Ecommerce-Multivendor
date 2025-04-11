
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

function App() {


  return (
    <>
      
        <ThemeProvider theme={customTheme}>
          <div>
            <Navbar />
          </div>
          {/* <Home /> */}
          {/* <Product /> */}
          {/* <ProductDetails /> */}
          {/* <Review /> */}
          {/* <Cart /> */}
          {/* <Checkout /> */}
          <Account />
        </ThemeProvider>

    </>
  )
}

export default App
