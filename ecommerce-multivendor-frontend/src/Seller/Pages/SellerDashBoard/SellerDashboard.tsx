import React from 'react'
import SellerDrawerlist from '../../Components/SellerDrawerlist'

const SellerDashboard = () => {
  return (
    <div className=''>
        <div className='lg:flex lg:h-[90vh]'>
            <section className='hidden lg:block h-full'>
                <SellerDrawerlist />
            </section>
            <section className='p-10 w-full lg:w-[80%] overflow-y-auto'>

            </section>
        </div>
    </div>
  )
}

export default SellerDashboard