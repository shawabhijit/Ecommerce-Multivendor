import React from 'react'
import ElectricCategory from './ElectricCategory/ElectricCategory'
import CategoryGrid from './CategoryGrid/CategoryGrid'
import Deal from './Deal/Deal'
import ShopByCategory from './ShopByCategory/ShopByCategory'
import { Button } from '@mui/material'
import { Storefront } from '@mui/icons-material'

const Home = () => {
    return (
        <>
            <div className='space-y-5 lg:space-y-10 relative'>
                <ElectricCategory />
                <CategoryGrid />
                

                <section className='pt-20'>
                    <h1 className='text-lg lg:text-4xl font-bold text-[#00927c] pb-10 text-center'>TODAY'S DEALS</h1>
                    <Deal />
                </section>

                <section className='py-20'>
                    <h1 className='text-lg lg:text-4xl font-bold text-[#00927c] pb-10 text-center'>SHOP BY CATEGORY</h1>
                    <ShopByCategory />
                </section>

                <section className='lg:px-20 relative h-[200px] lg:h-[450px] object-cover'>
                    <img className='w-full' src="https://imgs.search.brave.com/aKFnDxii9BKz1d-q07F8FWfpy62WoTCkaTyeiI8Htug/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzU5LzE1LzIy/LzM2MF9GXzM1OTE1/MjIxMV9oZG1GTGNu/cWN4bjBWTk91OUFt/VEtwSU5mTlBPeGE3/Vi5qcGc" alt="" />
                    <div className='w-full h-full absolute top-1/3 left-4 lg:left-[15rem] transform-translate-y-1/2 font-semibold lg:text-4xl space-y-3'>
                        <h1 className='text-lg md:text-2xl lg:text-3xl'>Sell Your Product</h1>
                        <p className='text-lg md:text-2xl lg:text-3xl'>With <span className='text-[#00927c] font-bold font-sans text-5xl'>HikariHub</span></p>
                        <div>
                            <Button startIcon={<Storefront />} variant='contained'>
                                Become a Seller
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home
