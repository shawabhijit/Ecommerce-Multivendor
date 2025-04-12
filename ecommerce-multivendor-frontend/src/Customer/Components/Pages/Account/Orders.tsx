import React from 'react'
import OrderItem from './OrderItem'
import { Divider } from '@mui/material'

const Orders = () => {
  return (
    <div className='text-sm min-h-screen '>
        <div className='pb-5'>
            <h1 className='font-semibold'>All Orders</h1>
            <p>From anytime</p>
        </div>
        <div className='space-y-2'>
            {
                [1,1,1].map((item) => (
                    <div>
                        <OrderItem />
                        <Divider />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Orders