import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellerDashboard from '../Seller/Pages/SellerDashBoard/Dashboard/SellerDashboard'

const SellerRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/seller/*" element={<SellerDashboard />} />
            </Routes>
        </div>
    )
}

export default SellerRoutes