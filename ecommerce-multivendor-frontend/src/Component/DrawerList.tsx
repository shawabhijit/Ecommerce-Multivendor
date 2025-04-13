import { AccountBalanceWallet, Add, Dashboard, Inventory, ShoppingBag } from '@mui/icons-material'
import React from 'react'

const menu = [
    {
        name:"Dashboard",
        path : "/seller",
        icon : <Dashboard className='text-teal-500' />,
        activeIcon: <Dashboard className='text-white' />
    },
    {
        name:"Orders",
        path : "/seller/orders",
        icon : <ShoppingBag className='text-teal-500' />,
        activeIcon: <ShoppingBag className='text-white' />
    },
    {
        name:"Products",
        path : "/seller/products",
        icon : <Inventory className='text-teal-500' />,
        activeIcon: <Inventory className='text-white' />
    },
    {
        name:"Add Product",
        path : "/seller/add-product",
        icon : <Add className='text-teal-500' />,
        activeIcon: <Add className='text-white' />
    },
    {
        name:"Payment",
        path : "/seller/payment",
        icon : <AccountBalanceWallet className='text-teal-500' />,
        activeIcon: <AccountBalanceWallet className='text-white' />
    },
]

const DrawerList = () => {
  return (
    <div className='h-full'>
        <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>
            <div>
                <div className='space-y-2'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default DrawerList