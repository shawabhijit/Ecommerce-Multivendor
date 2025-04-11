import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {
    const handleChange = (event:any) => {
        console.log('event ', event.target.value)
    }
    return (
        <div className='flex pb-4 border rounded-md'>
            <div>
                <Radio checked={true} onChange={handleChange} value="" name='radio-button' />
            </div>
            <div className='space-y-3 pt-2'>
                <h1>Abhijit</h1>
                <p className='w-[320px]'>kashiakoll , Bankura West bangal , Bankura-722155</p>
                <p><strong>Mobile</strong> - 73283978912</p>
            </div>
        </div>
    )
}

export default AddressCard