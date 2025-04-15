import React from 'react'
import ProfileFildCart from '../../../../Components/ProfileFildCart'
import { Divider } from '@mui/material'

const UserDetails = () => {
  return (
    <div className='flex py-10'>
      <div className='w-full lg:w-[80%]'>
        <div className='flex items-center pb-10 justify-between'>
          <h1 className='text-2xl font-bold text-gray-600 text-center w-full'>Personal Details</h1>
        </div>
        <div className='space-y-5 w-full'>
          <ProfileFildCart keys='Name' value={'Abhijit sahoo'} />
          <Divider />
          <ProfileFildCart keys='Mobile' value={"384894378"} />
          <Divider />
          <ProfileFildCart keys='Email' value={"shawabhijit@gmail.com"} />
        </div>
      </div>
    </div>
  )
}

export default UserDetails