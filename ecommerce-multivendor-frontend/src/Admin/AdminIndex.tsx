import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {AdminLogin} from './auth/AdminLogin/AdminLogin'
import { AdminLayout } from './Layout/AdminLayout'
import Dashboard from './AdminDashboard/Dashboard'
import Customers from './Customers/Customers'

const AdminIndex = () => {
    return (
        <main className='flex-grow min-h-screen overflow-hidden'>
            <div className='container mx-auto px-4 space-y-8 pb-10 mt-20'>
                <Routes>
                    {/* Public routes */}
                    <Route path="login" element={<AdminLogin />} />
                    {/* Protected routes */}
                    <Route path='/' element={<AdminLayout>
                            <Dashboard />
                        </AdminLayout>}
                    />
                    <Route path='/customers' element={<AdminLayout>
                            <Customers />
                        </AdminLayout>}
                    />
                </Routes>
            </div>
        </main>
    )
}

export default AdminIndex