import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import {AdminLogin} from './auth/AdminLogin/AdminLogin'
import { AdminLayout } from './Layout/AdminLayout'
import Dashboard from './AdminDashboard/Dashboard'
import Customers from './Customers/Customers'
import VendorList from './VendorList/VendorList'
import { useAppDispatch } from '../app/Store'
import { fetchAllSellers } from '../app/seller/SellerSlice'
import { fetchAllCustomers } from '../app/customer/CustomerSlice'
import { fetchAllOrders } from '../app/seller/SellerOrderSlice'

const AdminIndex = () => {
    const dispatch = useAppDispatch();
    const [allSelers , setAllSellers] = useState<any[]>([]);
    const [allCustomers , setAllCustomers] = useState<any[]>([]);
    const [allOrders , setAllOrders] = useState<any[]>([]);

    const getAllsellers = async () => {
        const res = await dispatch(fetchAllSellers(null));
        //console.log("All Sellers fetch successfully ,  Response:", res);
        if (res.meta.requestStatus === 'fulfilled') {
            setAllSellers(res.payload);
        }
    }

    const getAllCustomers = async () => {
        const res = await dispatch(fetchAllCustomers());
        //console.log("All Customers fetch successfully ,  Response:", res);
        if (res.meta.requestStatus === 'fulfilled') {
            setAllCustomers(res.payload);
        }
    }

    const getAllOrders = async () => {
        const res = await dispatch(fetchAllOrders());
        if (res.meta.requestStatus === 'fulfilled') {
            setAllOrders(res.payload);
        }
    }

    useEffect(() => {
        getAllsellers();
        getAllCustomers();
        getAllOrders();
    }, [dispatch])
    return (
        <main className='flex-grow min-h-screen overflow-hidden'>
            <div className='container mx-auto px-4 space-y-8 pb-10 mt-20'>
                <Routes>
                    {/* Public routes */}
                    <Route path="login" element={<AdminLogin />} />
                    {/* Protected routes */}
                    <Route path='/' element={<AdminLayout>
                        <Dashboard allSelers={allSelers} allCustomers={allCustomers} allOrders={allOrders} />
                        </AdminLayout>}
                    />
                    <Route path='/customers' element={<AdminLayout>
                            <Customers allCustomers={allCustomers} />
                        </AdminLayout>}
                    />
                    <Route path='/sellers' element={<AdminLayout>
                        <VendorList allSelers={allSelers} />
                    </AdminLayout>}
                    />
                </Routes>
            </div>
        </main>
    )
}

export default AdminIndex