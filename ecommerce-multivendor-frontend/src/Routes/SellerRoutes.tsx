import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Seller/Pages/SellerDashBoard/Dashboard/Dashboard'
import SellerProducts from '../Seller/Pages/SellerDashBoard/Product/SellerProducts'
import SellerAddProduct from '../Seller/Pages/SellerDashBoard/Product/SellerAddProduct'
import SellerOrder from '../Seller/Pages/SellerDashBoard/Orders/SellerOrder'
import SellerAccount from '../Seller/Pages/SellerDashBoard/Account/SellerAccount'
import Payment from '../Seller/Pages/SellerDashBoard/Payment/Payment'
import Transection from '../Seller/Pages/SellerDashBoard/Payment/Transection'

const SellerRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<SellerProducts />} />
                <Route path="/add-product" element={<SellerAddProduct />} />
                <Route path="/orders" element={<SellerOrder />} />
                <Route path="/account" element={<SellerAccount />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/transection" element={<Transection />} />
            </Routes>
        </div>
    )
}

export default SellerRoutes