import { Button, Divider } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import OrderStepper from './OrderStepper'
import { Payments } from '@mui/icons-material'

const OrderDetails = () => {
    const navigate = useNavigate();

    const handleCancelOrder = (event: any) => {
        console.log('event', event.target.value)
    }
    return (
        <Box >
            <section className='flex flex-col gap-5 justify-center items-center'>
                <img className='w-[100px]' src="https://m.media-amazon.com/images/I/61XhyczDqQL._AC_SR405%2C405_.jpg" alt="" />
                <div className='flex  flex-col items-center w-full'>
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
            <section className='p-5 border border-gray-300 rounded-md'>
                <OrderStepper orderStatus={"SHIPPED"} />
            </section>
            <div className='border border-gray-300 p-5 mt-2 rounded-md'>
                <h1 className='font-bold pb-3'>Delivery Address</h1>
                <div className='text-sm space-y-2'>
                    <div className='flex gap-5 font-medium'>
                        <p>Abhijit Sahoo</p>
                        <Divider />
                        <p>9384798343</p>
                    </div>
                    <p>
                        kashiakoll , Bankura West bangal , Bankura 722155
                    </p>
                </div>
            </div>
            <div className='border border-gray-300 space-y-4 mt-2'>
                <div className='flex justify-between text-sm pt-5 px-5'>
                    <div className='space-y-1'>
                        <p className='font-bold'>Total Item Price</p>
                        <p>You saved <span className='text-green-500 font-medium text-xs'>₹ 560.00 </span> on this item</p>
                    </div>
                    <p className='font-medium'> ₹ 4839</p>
                </div>
                <div className='px-5'>
                    <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
                        <Payments />
                        <p>Pay on Delivery</p>
                    </div>
                </div>
                <Divider />
                <div className='px-5 pb-5'>
                    <p className='text-xs'><strong>Sold by :</strong> gurdani mukana</p>
                </div>
                <div className='p-10'>
                    <Button disabled={false} onClick={handleCancelOrder} color='error' sx={{ py: "0.7rem" }} className='' variant='outlined' fullWidth>
                        {
                            false ? "order canceled" : "Cancel Order"
                        }
                    </Button>
                </div>
            </div>
        </Box>
    )
}

export default OrderDetails