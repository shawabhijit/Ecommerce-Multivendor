import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./Components/Pages/NotFoundPage/NotFound";
import Index from "./Customer/Components/Pages/Home/Index";
import { ThemeProvider } from "./context/theme-provider";
import { useEffect } from "react";
import SellerIndex from "./Seller/SellerIndex";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor, useAppSelecter } from "./app/Store";
import CustomerLogin from "./Customer/Components/Pages/auth/CustomerLogin";
import CustomerSignup from "./Customer/Components/Pages/auth/CustomerSignup";
import Navbar from "./Customer/Components/Layout/Navbar/Navbar";
import CustomerIndex from "./Customer/Components/Pages/CustomerIndex";
// import { QueryClientProvider } from "@tanstack/react-query";

function AppWrapper() {  

  // const { isLoggedIn , loading , error} = useAppSelecter((state) => state.customers)
  

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
        <Route path="/*" element={<CustomerIndex />} />
        <Route path="*" element={<NotFound />} />
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
