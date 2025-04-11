import { ElectricBolt } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { teal } from '@mui/material/colors'
import React from 'react'

const OrderItem = () => {
  return (
    <div className='text-sm bg-white p-5 space-y-4 rounded-md cursor-pointer'>
        <div className='flex items-center gap-5'>
            <div>
                <Avatar sizes='small' sx={{bgcolor:teal[500]}}>
                    <ElectricBolt />
                </Avatar>
            </div>
            <div>
                <h1 className='font-bold text-teal-500 '>Pending</h1>
                <p>Arriving By Mon, 15 jul</p>
            </div>
        </div>
        <div className='p-5 bg-teal-50 flex gap-3 '>
            <div>
                <img className='w-[70px] ' src="https://m.media-amazon.com/images/I/61XhyczDqQL._AC_SR405%2C405_.jpg" alt="" />
            </div>
            <div className='w-full space-y-2'>
                <h1 className='font-bold text-lg'>boAt New Launch Storm Infinity w/15 Days Extensive</h1>
                <p className='text-gray-700 text-sm'>Battery fueled by Huge 550mAh Battery, Fast Charge, 1.83”(4.65cm)HD Display, Functional Crown, BT Calling, Smart watch for Men & Women (Active Black)</p>
                <p>size : FREE</p>
            </div>
        </div>
    </div>
  )
}

export default OrderItem