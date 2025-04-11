import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import OrderStepper from './OrderStepper'

const OrderDetails = () => {
    const navigate = useNavigate();
  return (
    <Box >
        <section className='flex flex-col gap-5 justify-center items-center'>
            <img className='w-[100px]' src="https://m.media-amazon.com/images/I/61XhyczDqQL._AC_SR405%2C405_.jpg" alt="" />
            <div>
                <h1 className='font-bold'>Storm Infinity</h1>
                <p>Battery fueled by Huge 550mAh Battery, Fast Charge, 1.83”(4.65cm)HD Display, Functional Crown, BT Calling, Smart watch for Men & Women (Active Black)</p>
                <p><strong>Size:</strong>M</p>
            </div>
            <div>
                <Button onClick={() => navigate(`/reviews/${5}/create`)}>
                    Write Review
                </Button>
            </div>
        </section>
        <section className='border p-5'>
            <OrderStepper orderStatus={"PENDING"} />
        </section>
    </Box>
  )
}

export default OrderDetails