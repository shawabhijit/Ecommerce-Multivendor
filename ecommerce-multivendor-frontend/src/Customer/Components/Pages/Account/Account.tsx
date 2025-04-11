import { Divider } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Orders from './Orders'

const menu = [
    { name: "orders", path: "/account/orders" },
    { name: "profile", path: "/account/profile" },
    { name: "Saved Cards", path: "/account/saved-card" },
    { name: "Addresses", path: "/account/addresses" },
    { name: "Logout", path: "/" },
]

const Account = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = (item: any) => {
        navigate(item.path)
    }
    return (
        <div className='px-5 lg:px-52 min-h-screen mt-10'>
            <div>
                <h1 className='text-xl font-bold pb-5'>Abhijit Sahoo</h1>
            </div>
            <Divider />
            <div className='grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]'>
                <section className='left col-span-1 lg:border-r lg:pr-5 py-5 h-full'>
                    {
                        menu.map((item) => (
                            <div
                                onClick={() => handleClick(item)}
                                key={item.path}
                                className={`${item.path == location.pathname ? " text-teal-500" : ""}
                                py-3 px-5 rounded-md text-[1.1em] font-semibold cursor-pointer hover:text-teal-500 hover:bg-gray-100`}>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </section>
                <section className='right lg:col-span-2 lg:pl-5 py-5'>
                    <Orders />
                </section>
            </div>
        </div>
    )
}

export default Account