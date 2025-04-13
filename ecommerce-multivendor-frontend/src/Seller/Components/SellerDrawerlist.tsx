import { AccountBalanceWallet, AccountBox, Add, Dashboard, Inventory, Logout, Receipt, ShoppingBag } from '@mui/icons-material'
import React from 'react'
import DrawerList from '../../Component/DrawerList'

type menuItem = {
    name: string;
    path: string;
    icon: any;
    activeIcon: any;
}

const menu : menuItem[] = [
    {
        name: "Dashboard",
        path: "/seller",
        icon: <Dashboard className='text-teal-500' />,
        activeIcon: <Dashboard className='text-white' />
    },
    {
        name: "Orders",
        path: "/seller/orders",
        icon: <ShoppingBag className='text-teal-500' />,
        activeIcon: <ShoppingBag className='text-white' />
    },
    {
        name: "Products",
        path: "/seller/products",
        icon: <Inventory className='text-teal-500' />,
        activeIcon: <Inventory className='text-white' />
    },
    {
        name: "Add Product",
        path: "/seller/add-product",
        icon: <Add className='text-teal-500' />,
        activeIcon: <Add className='text-white' />
    },
    {
        name: "Payment",
        path: "/seller/payment",
        icon: <AccountBalanceWallet className='text-teal-500' />,
        activeIcon: <AccountBalanceWallet className='text-white' />
    },
    {
        name: "Transection",
        path: "/seller/transection",
        icon: <Receipt className='text-teal-500' />,
        activeIcon: <Receipt className='text-white' />
    },
]

const menu2 : menuItem[] = [
    {
        name: "Account",
        path: "/seller/account",
        icon: <AccountBox className='text-teal-500' />,
        activeIcon: <AccountBox className='text-white' />
    },
    {
        name: "Logout",
        path: "/",
        icon: <Logout className='text-teal-500' />,
        activeIcon: <Logout className='text-white' />
    },
]


const SellerDrawerlist = ({toogleDrawer} : {toogleDrawer:any}) => {
  return (
    
        <DrawerList menu={menu} menu2={menu2} toogleDrawer={toogleDrawer} />
  )
}

export default SellerDrawerlist