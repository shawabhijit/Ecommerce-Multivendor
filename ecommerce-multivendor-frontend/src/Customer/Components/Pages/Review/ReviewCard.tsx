import { Delete } from '@mui/icons-material'
import { Avatar, Box, IconButton, Rating, } from '@mui/material'
import { red } from '@mui/material/colors'
import Grid from '@mui/material/Grid'
// import Grid from '@mui/material/Unstable_Grid2'

import React from 'react'

const ReviewCard = () => {
  return (
    <div className='flex justify-between'>
      <Grid container spacing={1} gap={6}>
        <Grid size={{xs: 1}} >
          <Box>
            <Avatar className='text-white' sx={{ height: 56, width: 56, backgroundColor: '#9155FD' }}>
              H
            </Avatar>
          </Box>
        </Grid>
        <Grid size={{xs:9}}>
          <div className='space-y-2'>
            <div>
              <p className='font-semibold text-lg'>Harkirat</p>
              <p className='opacity-70'>Reviewed in India on 24 May 2024</p>
            </div>
          </div>
          <Rating 
            readOnly
            value={4}
            precision={.5}
          />
          <p>value for mony , great product</p>
          <div>
            <img className='w-30 h-30 object-cover'  src="https://m.media-amazon.com/images/I/714XqAOu6cL._AC_FMavif_UC231,231_CACC,231,231_QL58_.jpg?aicid=community-reviews" alt="" />
          </div>
        </Grid>
        
      </Grid>

      <div>
        <IconButton>
          <Delete sx={{ color: red[700] }} />
        </IconButton>
      </div>
    </div>
  )
}

export default ReviewCard