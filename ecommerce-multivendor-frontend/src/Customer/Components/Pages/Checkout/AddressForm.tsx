import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup"

const AddressFormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string().required("Mobile Number is required").matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
    pincode: Yup.string().required("Pincode is required").matches(/^[1-9][0-9]{5}$/, "Invalid pincode"),
    address: Yup.string().required("address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    locality: Yup.string().required("Locality is required"),
})

const AddressForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            pincode: "",
            address: "",
            city: "",
            state: "",
            locality: ""
        },
        validationSchema: AddressFormSchema,
        onSubmit: (values) => {
            console.log('values', values)
        }
    })
    return (
        <Box sx={{ max: "auto" }}>
            <p className='text-xl font-bold text-center pb-5'>Contact Details</p>

            <form action="" onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name='name'
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            name='mobile'
                            label="Mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            name='pincode'
                            label="Pincode"
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={formik.touched.pincode && formik.errors.pincode}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name='address'
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            name='city'
                            label="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>
                    <Grid size={{ xs:6 }}>
                        <TextField
                            fullWidth
                            name='state'
                            label="State"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            name='locality'
                            label="Locality"
                            value={formik.values.locality}
                            onChange={formik.handleChange}
                            error={formik.touched.locality && Boolean(formik.errors.locality)}
                            helperText={formik.touched.locality && formik.errors.locality}
                        />
                    </Grid>
                    <Grid size={{xs:12}}>
                        <Button type='submit' variant='contained' sx={{py:"14px"}} fullWidth>
                            Add Address
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default AddressForm