import React, { useState } from 'react'
import CartItem from './CartItem'
import { Button, Divider, IconButton, TextField } from '@mui/material'
import { Close, LocalOffer } from '@mui/icons-material'
import { teal } from '@mui/material/colors'
import PricingCart from './PricingCart'

const Cart = () => {

    const [couponCode, setCouponCode] = useState("")

    const handleChange = (e: any) => {
        setCouponCode(e.terget.value)
    }
    return (
        <div className='pt-10 px-5 sm:px-10 md:px-60 min-h-screen'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <div className='cart-item lg:col-span-2 space-y-3 '>
                    {
                        [1, 1].map((item, index) => <div key={index}>
                            <CartItem />
                            <Divider />
                        </div>)
                    }
                </div>
                <div className='pricing col-span-1 text-sm space-y-3'>
                    <div className='border rounded-md px-5 py-3 space-y-5'>

                        <div className='flex gap-3 text-sm items-center'>
                            <div className=''>
                                <LocalOffer sx={{ color: teal[600], fontSize: "17px" }} />
                            </div>
                            <span>Apply Coupons</span>
                        </div>
                        {
                            true ?
                            <div className='flex justify-between gap-3 items-center'>
                                <TextField onChange={handleChange} id='outlined-besic' placeholder='Coupon code' variant='outlined' />
                                <Button size='small'>
                                    Apply
                                </Button>
                            </div> : 
                            <div className='flex'>
                                <div className='p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center'>
                                    <span>hikariHub07 Applied</span>
                                    <IconButton size='small'>
                                        <Close className='text-red-600' />
                                    </IconButton>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='border rounded-md'>
                        <PricingCart />
                        <div className='p-2'>
                            <Button sx={{ py: "11px" }} variant='contained' fullWidth>
                                Buy now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart