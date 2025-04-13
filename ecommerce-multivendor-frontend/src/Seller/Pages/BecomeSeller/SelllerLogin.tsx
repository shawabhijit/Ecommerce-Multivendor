import { Button, TextField } from '@mui/material'
import React from 'react'

const SelllerLogin = ({formik} : any) => {

  const isSuccessfullySendOtp = false;
  return (
    <div className='space-y-5'>
      <div>
        <TextField
          fullWidth
          name='email'
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched?.email && Boolean(formik.errors?.email)}
          helperText={formik.touched?.email && formik.errors?.email}
        />
      </div>
      {isSuccessfullySendOtp && 
        <div>
          <TextField
            fullWidth
            name='otp'
            label="Otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched?.otp && Boolean(formik.errors?.otp)}
            helperText={formik.touched?.otp && formik.errors?.otp}
          />
        </div>}
      <Button fullWidth variant='contained' sx={{py:2}}>
        Send Otp
      </Button>
    </div>
  )
}

export default SelllerLogin