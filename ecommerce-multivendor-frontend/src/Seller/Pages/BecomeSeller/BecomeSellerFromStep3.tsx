import { TextField } from '@mui/material'
import React from 'react'

const BecomeSellerFromStep3 = ({formik} : any) => {
    return (
        <div className='space-y-5'>
            <div className=''>
                <TextField
                    fullWidth
                    name='bankDetails.accountNumber'
                    label="Account Number"
                    value={formik.values.bankDetails.accountNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.bankDetails?.accountNumber && Boolean(formik.errors.bankDetails?.accountNumber)}
                    helperText={formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    name='bankDetails.ifscCode'
                    label="IFSC Code"
                    value={formik.values.bankDetails.ifscCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.bankDetails?.ifscCode && Boolean(formik.errors.bankDetails?.ifscCode)}
                    helperText={formik.touched.bankDetails?.ifscCode && formik.errors.bankDetails?.ifscCode}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    name='bankDetails.accountHolderName'
                    label="Account Holder Name"
                    value={formik.values.bankDetails.accountHolderName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.bankDetails?.accountHolderName && Boolean(formik.errors.bankDetails?.accountHolderName)}
                    helperText={formik.touched.bankDetails?.accountHolderName && formik.errors.bankDetails?.accountHolderName}
                />
            </div>
        </div>
    )
}

export default BecomeSellerFromStep3