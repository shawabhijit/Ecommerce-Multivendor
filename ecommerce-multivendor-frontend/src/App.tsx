import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./Components/Pages/NotFoundPage/NotFound";
import { ThemeProvider } from "./context/theme-provider";
import { useEffect } from "react";
import SellerIndex from "./Seller/SellerIndex";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/Store";
import CustomerIndex from "./Customer/Components/Pages/CustomerIndex";
import { Toaster } from "./Components/ui/sonner";
import AdminIndex from "./Admin/AdminIndex";
import LoadingPage from "./Components/Pages/LoadingPage";

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
        <Route path="/*" element={<CustomerIndex />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/seller/*" element={<SellerIndex />} />
        <Route path="/admin/*" element={<AdminIndex />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    // <QueryClientProvider>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <BrowserRouter>
            <AppWrapper />
            <Toaster position="bottom-right" richColors />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
    // </QueryClientProvider>
  );
}

export default App;
