import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'

const Review = () => {
  return (
    <div className='p-5 lg:px-20 flex flex-col lg:flex-row gap-20'>
      <section className='w-full md:w-1/2 lg:w-[30%] space-y-2 '>
        <img src="https://m.media-amazon.com/images/I/61nxQ62qglL._SX679_.jpg" alt="" />
        <div>
          <div>
            <p className='font-bold text-xl'>One Plus</p>
            <p className='text-lg text-gray-600 '>OnePlus Nord CE4 (Celadon Marble, 8GB RAM, 128GB Storage)</p>
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
          </div>
        </div>
      </section>
      <section className='space-y-5 w-full'>
        {
          [1,1,1,1,1,1,11,1,1,1,1].map( (item , index) => <div className='space-y-3' key={index}>
            <ReviewCard />
            <Divider />
          </div>)
        }
      </section>
    </div>
  )
}

export default Review