import { Avatar, Box, Grid, ListItem } from '@mui/material'
import React from 'react'

const ReviewCard = () => {
  return (
    <div className='flex justify-between'>
      <Grid container spacing={2} gap={3}>
        <Grid>
          <ListItem>xs=1</ListItem>
          <Box>
            <Avatar className='text-white' sx={{height:56, width:56,backgroundColor:'#9155FD'}}>
              H
            </Avatar>
          </Box>
        </Grid>

      </Grid>
    </div>
  )
}

export default ReviewCard