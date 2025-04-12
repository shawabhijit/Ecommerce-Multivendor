import { Radio } from '@mui/material'
import React from 'react'

const UserAddressCard = () => {

    const handleChange = () => {

    }
  return (
    <div className='p-5 rounded-md flex'>
        <div>
            <Radio
                checked={true}
                onChange={handleChange}
                value=""
                name='redio-button'
            />
        </div>
        <div className='space-y-3 pt-3'>
            <h1>Abhijit</h1>
            <p className='w-[320px]'>Kashjiakoll bankura West bangal , bankura 722133</p>
            <p><strong>Mobile :</strong> 38978973247</p>
        </div>
    </div>
  )
}

export default UserAddressCard