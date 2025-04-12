import React from 'react'
import UserAddressCard from './UserAddressCard'
import { Divider } from '@mui/material'

const Address = () => {
  return (
    <div className='space-y-3'>
        {
            [1,1,1,1].map((item , index) => (
                <div key={index}>
                    <UserAddressCard />
                    <Divider />
                </div>
            ))
        }
    </div>
  )
}

export default Address