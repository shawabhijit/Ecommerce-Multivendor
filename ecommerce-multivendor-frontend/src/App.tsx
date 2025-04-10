
import { Button, ThemeProvider } from "@mui/material"
import Navbar from "./Customer/Components/Navbar/Navbar"
import { customTheme } from "./Theme/CustomTheme"
import Home from "./Customer/Components/Pages/Home/Home"
import Product from "./Customer/Components/Pages/Product/Product"

function App() {


  return (
    <>
      
        <ThemeProvider theme={customTheme}>
          <div>
            <Navbar />
          </div>
          {/* <Home /> */}
          <Product />
        </ThemeProvider>

    </>
  )
}

export default App
