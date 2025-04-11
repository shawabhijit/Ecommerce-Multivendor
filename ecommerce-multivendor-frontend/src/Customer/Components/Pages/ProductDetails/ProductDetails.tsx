import { Add, AddShoppingCart, FavoriteBorder, LocalShipping, Remove, Shield, Star, Wallet, WorkspacePremium } from '@mui/icons-material'
import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { teal } from '@mui/material/colors';
import { Button, Divider } from '@mui/material';
import SimillerProducts from './SimillerProducts';

const images = [
    "https://m.media-amazon.com/images/I/41bkMtA7usL._SX300_SY300_QL70_FMwebp_.jpg",
    "https://m.media-amazon.com/images/I/51WU-TWgRHL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/51jCor3c-EL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/41bkMtA7usL._SX300_SY300_QL70_FMwebp_.jpg",
    "https://m.media-amazon.com/images/I/71rooC1PHHL._SX679_.jpg"
]

const ProductDetails = () => {

    const [Quantity, setQuantity] = useState(1)
    return (
        <div className='px-5 lg:px-20 pt-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                <section className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
                        {
                            [1, 1, 1, 1, 1].map((item, index) => <img className='lg:w-full w-[50px] cursor-pointer rounded-md' src={images[index]} alt="" />)
                        }
                    </div>
                    <div className='w-full lg:w-[85%]'>
                        <img className='w-full rounded-md' src="https://m.media-amazon.com/images/I/41bkMtA7usL._SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                    </div>
                </section>

                <section>
                    <h1 className='font-bold text-lg lg:text-3xl text-black'>OnePlus Nord CE4 </h1>
                    <p className='text-gray-500 font-semibold'>
                        Celadon Marble, 8GB RAM, 128GB Storage
                    </p>
                    <div className='flex justify-between items-center py-2 w-[180px] px-4 mt-3'>
                        <div className='flex gap-1 items-center'>
                            <span>4</span>
                            <StarIcon sx={{ color: teal[500], fontSize: "17px" }} />
                        </div>
                        <Divider orientation='vertical' flexItem />
                        <span>
                            234 Ratings
                        </span>
                    </div>
                    <div>
                        <div className='price flex items-center gap-3 mt-5'>
                            <span className='font-sans text-gray-500'>
                                MRP: <span className='line-through'>₹ 24,999</span>
                            </span>
                            <span className='font-sans'>
                                <span className='font-bold text-lg'>₹ 19,999</span>
                            </span>
                            <span className='font-semibold text-red-400'>
                                30% off
                            </span>
                        </div>
                        <p className='text-sm'>Inclusive of all taxes</p>
                    </div>
                    <div className='mt-7 space-y-3'>
                        <div className='flex items-center gap-4'>
                            <Shield sx={{color:teal[500]}} />
                            <p>Authentic & Quality Assured</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <WorkspacePremium sx={{color:teal[500]}} />
                            <p>100% money back gurarantee</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <LocalShipping sx={{color:teal[500]}} />
                            <p>Free SAhiping & returns</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Wallet sx={{color:teal[500]}} />
                            <p>pay on delivery might be available</p>
                        </div>
                    </div>
                    <div className='mt-7 space-y-2'>
                        <h1>
                            QUANTITY
                        </h1>
                        <div className='flex items-center gap-2 justify-between w-[140px]'>
                            <Button onClick={() => setQuantity(Quantity - 1)} disabled={Quantity === 1}>
                                <Remove />
                            </Button>
                            <span>
                                {Quantity}
                            </span>
                            <Button onClick={() => setQuantity(Quantity + 1)}>
                                <Add />
                            </Button>
                        </div>
                    </div>

                    <div className='mt-10 flex items-center gap-5'>
                        <Button fullWidth variant='contained' startIcon={<AddShoppingCart />} sx={{py:"1rem"}}>
                            Add To Bag
                        </Button>
                        <Button fullWidth variant='outlined' startIcon={<FavoriteBorder />} sx={{ py: "1rem" }}>
                            Whish List
                        </Button>
                    </div>
                    <div className='mt-5 text-sm'>
                        <p>Highest-Power with Snapdragon 7 Gen 3: Experience unrivalled speed and efficiency with the Qualcomm Snapdragon 7 Gen 3 chipset. It powers through demanding tasks, delivers blazing download speeds up to 5Gbps, and optimizes battery usage for mobile gaming, productivity, and entertainment without compromise.</p>
                    </div>
                </section>
            </div>

            <div className='mt-20'>
                <h1 className='text-lg font-bold'>Similar Products</h1>
                <div className='pt-5'>
                    <SimillerProducts />
                </div>
            </div>
        </div>
    )
}

export default ProductDetails