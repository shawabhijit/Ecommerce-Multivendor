import { Add, Close, Remove } from '@mui/icons-material'
import { Button, Divider, IconButton } from '@mui/material'
import { teal } from '@mui/material/colors'
import React, { useState } from 'react'

const CartItem = () => {

    const [quantity , setQuantity] = useState(5)

    const handleUpdateQuantity = () => {
        console.log("Update Quantity")
    }
    return (
        <div className='rounded-md relative'>
            <div className='p-5 flex gap-3'>
                <div>
                    <img className='w-[90px] rounded-md ' src="https://m.media-amazon.com/images/I/71gqG3eydkL._AC_AA440_.jpg" alt="" />
                </div>
                <div className=''>
                    <h1 className='font-semibold text-lg'>Contacts Unisex Vintage Travel Laptop Backpack </h1>
                    <p className='text-sm text-teal-500'>In stock</p>
                    <p className='text-[15px] text-gray-500'>Eligible for FREE Shipping</p>
                    <p className='text-sm'>7 Days Replacement available</p>
                    <p className='text-sm text-gray-500'><strong>Quantity :</strong> 5</p>
                </div>
            </div>
            <Divider />
            <div className='flex justify-between items-center'>
                <div className='px-5 py-2 flex items-center justify-between'>
                    <div className='flex items-center gap-2 w-[140px] justify-between'>
                        <Button disabled={true} onClick={handleUpdateQuantity}>
                            <Remove />
                        </Button>
                        <span>
                            {5}
                        </span>
                        <Button onClick={handleUpdateQuantity}>
                            <Add />
                        </Button>
                    </div>
                </div>
                <div className='pr-5'>
                    <p className='text-gray-700 font-medium'>₹ 1190</p>
                </div>
            </div>
            <div className='absolute top-1 right-1'>
                <IconButton>
                    <Close sx={{ color:teal[500] }} />
                </IconButton>
            </div>
        </div>
    )
}

export default CartItem