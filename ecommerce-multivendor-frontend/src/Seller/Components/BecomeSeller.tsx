import React, { useState } from 'react'
import SellerAccountForm from './SellerAccountForm';
import SelllerLogin from './SelllerLogin';
import { Button } from '@mui/material';

const BecomeSeller = () => {

    const [isLogin , setIsLogin] = useState(false);

    const handleShowPage = () => {
        setIsLogin(!isLogin);
    }

  return (
    <div className='grid grid-cols-3 min-h-screen md:gap-10'>
        <section className='lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-md'>
            {
                !isLogin ? <SellerAccountForm /> : <SelllerLogin />
            }
            <div className='mt-10 space-y-2'>
                <h1 className='text-center text-sm font-medium'>
                    Have Account
                </h1>
                <Button onClick={handleShowPage} fullWidth sx={{py:"11px"}} variant='outlined'>
                    {
                        isLogin ? "Register":"Login"
                    }
                </Button>
            </div>
        </section>
        <section className='hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center relative'>
            <div className='lg:w-[80%] px-2 space-y-10 justify-center border'>
                <div>
                    <img className='w-full h-full object-cover rounded-2xl' src="https://marketplace.canva.com/EAE6jsIblTU/2/0/1600w/canva-purple-how-to-become-successful-a-seller-youtube-tutorial-thumbnail-VyqKBfVxkpY.jpg" alt="" />
                </div>
            </div>

        </section>
    </div>
  )
}

export default BecomeSeller