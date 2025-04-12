import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const BecomeSellerFormStep1 = ({ formik }: any) => {
    return (
        <Box>
            <p className='text-xl font-bold text-center pb-9'>Contact Details</p>
            <div className='space-y-10 pb-5'>
                <TextField
                    fullWidth
                    name='mobile'
                    label="Mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                />
            </div>
            <div className='space-y-10 '>
                <TextField
                    fullWidth
                    name='GETIN'
                    label="GETIN"
                    value={formik.values.GSTIN}
                    onChange={formik.handleChange}
                    error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
                    helperText={formik.touched.GSTIN && formik.errors.GSTIN}
                />
            </div>
        </Box>
    )
}

export default BecomeSellerFormStep1