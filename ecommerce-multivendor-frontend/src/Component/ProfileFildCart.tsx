import { Edit } from '@mui/icons-material';
import { Button, Divider } from '@mui/material'
import React from 'react'

type props = {
    keys : string;
    value : string
}

const ProfileFildCart = ({keys , value} : props) => {
  return (
    <div className='p-5 flex items-center bg-slate-50 gap-3'>
        <p className='w-20 lg:w-[150px] pr-5'>{keys}</p>
        <Divider orientation='vertical' flexItem/>
        <p className='pl-4 lg:pl-10 font-semibold lg:text-lg'>{value}</p>
        <Button variant='outlined' className=''>
            <Edit sx={{color:"gray"}}/>
        </Button>
    </div>
  )
}

export default ProfileFildCart