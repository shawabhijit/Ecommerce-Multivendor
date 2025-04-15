import { Button, Card, Divider } from '@mui/material'
import React from 'react'
import Transection from './Transection'

const Payment = () => {

  
  return (
    <div className=''>
      <div className='mb-5'>
        <Card className='rounded-md space-y-4 p-3 w-[50%] mb-3'>
          <h1 className='text-gray-600 font-medium'>Total Earning</h1>
          <h1 className='font-bold text-black'>₹ 45789</h1>
        </Card>
        <Card className='rounded-md space-y-4 p-3 w-[50%]'>
          <h1 className='text-gray-600 font-medium'>Last Payment: <span className='font-bold text-black'> ₹0</span></h1>
        </Card>
      </div>
      <Divider />
      <div className='mt-5 flex flex-col gap-10'>
        <Button variant='contained' sx={{width:"20%" , p:1.5}}>
          Transection
        </Button>
        <Transection />
      </div>
    </div>
  )
}

export default Payment