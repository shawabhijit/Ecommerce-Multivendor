import { Divider } from '@mui/material'
import React from 'react'

const PricingCart = () => {
  return (
    <div className='space-y-3 p-5'>
      <div className='flex justify-between items-center'>
        <span>
          Subtotal
        </span>
        <span>₹ 120000</span>
      </div>
      <div className='flex justify-between items-center'>
        <span>
          Dsicount
        </span>
        <span>₹ 1200</span>
      </div>
      <div className='flex justify-between items-center'>
        <span>
          Shipping
        </span>
        <span>₹ 100</span>
      </div>
      <div className='flex justify-between items-center'>
        <span>
          Platfrom 
        </span>
        <span>₹ 5</span>
      </div>
      <Divider />
      <div className='flex justify-between items-center pt-5'>
        <span>
          Total
        </span>
        <span>₹ 121305</span>
      </div>
    </div>
  )
}

export default PricingCart