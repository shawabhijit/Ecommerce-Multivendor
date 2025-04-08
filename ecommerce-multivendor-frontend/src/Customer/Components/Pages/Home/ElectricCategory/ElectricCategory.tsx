import React from 'react'
import ElectricCategoryCard from './ElectricCategoryCard'

const ElectricCategory = () => {
    return (
        <>
            <div className='flex flex-wrap justify-between px-5 lg:px-20 py-5 lg:py-10 border-b'>
                {
                    [1,1,1,1,1,1].map((item) => (
                        <ElectricCategoryCard />
                    ))
                }
            </div>
        </>
    )
}

export default ElectricCategory
