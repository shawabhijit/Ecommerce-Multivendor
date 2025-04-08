import React from 'react'

const CategoryGrid = () => {
  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
      <div className='col-span-3 row-span-12 text-white'>
        <img
        className='w-full h-full object-cover object-top rounded-md'
        src="https://m.media-amazon.com/images/I/510uneopBkL._AC_UL480_FMwebp_QL65_.jpg" alt="" />
      </div>
      <div className='col-span-2 row-span-6 text-white'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
        src="https://m.media-amazon.com/images/I/81+HeNEhsvL._SY500_.jpg" alt="" />
      </div>
      <div className='col-span-4 row-span-6 text-white'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
        src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/3d8cd53b-e89f-4cf7-8bf8-d870d45eb3de.__CR0,485,3600,3600_PT0_SX300_V1___.jpg" alt="" />
      </div>
      <div className='col-span-3 row-span-12 text-white'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
        src="https://m.media-amazon.com/images/I/51yeRwXRm-L._AC_UL480_FMwebp_QL65_.jpg" alt="" />
      </div>
      <div className='col-span-4 row-span-6 text-white'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
        src="https://m.media-amazon.com/images/I/71EApUovk1L._SY625_.jpg" alt="" />
      </div>
      <div className='col-span-2 row-span-6 text-white'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
        src="https://m.media-amazon.com/images/I/71OcSrhTBxL._SY695_.jpg" alt="" />
      </div>
    </div>
  )
}

export default CategoryGrid