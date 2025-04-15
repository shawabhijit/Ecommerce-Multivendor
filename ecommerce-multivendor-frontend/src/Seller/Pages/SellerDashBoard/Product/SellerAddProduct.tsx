import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import { Grid } from '@mui/system';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { uploadToCloudninary } from '../../../../util/CloudinarySupport';

const SellerAddProduct = () => {

  const [uploadImage , setUploadImage] = useState(false);

  const [snackbarOpen , setSnackbarOpen] = useState(false)

  const handleImageChange = async (event : any) => {
    const file = event.target.files[0];
    setUploadImage(true);
    const image = await uploadToCloudninary(file);
    //formik ...
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  }

  const handleRemoveImage = (index:number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index,1);
    formik.setFieldValue("images", updatedImages);
  }

  const formik = useFormik({
    initialValues:{
      title:"",
      description:"",
      mrpPrice:"",
      sellingPrice:"",
      quantity:"",
      color:"",
      images:[],
      category:"",
      category2:"",
      category3:"",
      sizes:"",
    },
    validationSchema:"",
    onSubmit: () => {

    }
  });

  return (
    <div>
      <form className='space-y-4 p-4' onSubmit={formik.handleSubmit}>
        <Grid className="flex flex-wrap gap-5" size={{xs:12}}>
          <input type="file" accept='image/*'  id='fileInput' style={{display:"none"}} onChange={handleImageChange} />
          <label htmlFor="fileInput" className='relative'>
            <span className='w-24 h-24 cursor-pointer flex intems-center justify-center p-3 border rounded-md border-gray-400'>
              <AddPhotoAlternate className='text-gray-700' />
            </span>
            {
              uploadImage && (
                <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                  <CircularProgress />
                </div>
              )
            }
          </label>

          <div className='flex flex-wrap gap-2'>
            {
              formik.values.images.map((image, index) => (
                <div className='relative'>
                  <img 
                    className='w-24 h-24 object-cover'
                    key={index}
                    src={image}
                    alt={`ProductImage ${index + 1}`}
                  />
                  <IconButton onClick={() => handleRemoveImage(index)} className='' size='small' color='error' sx={{position:"absolute", top:0 , right:0, outline:"none"}} >
                    <Close sx={{fontSize: "1rem"}} />
                  </IconButton>
                </div>
              ))
            }
          </div>
        </Grid>
        <Grid size={{xs:12}}>
          <TextField 
            fullWidth
            id='title'
            name='title'
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            required
          />
        </Grid>
        <Grid size={{xs:12}}>
          <TextField 
            fullWidth
            id='description'
            name='description'
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            required
          />
        </Grid>
        <Grid size={{xs:12 , md:4 , lg:3}}>
          <TextField 
            fullWidth
            id='mrpPrice'
            name='mrpPrice'
            label="Mrp Price"
            type='number'
            value={formik.values.mrpPrice}
            onChange={formik.handleChange}
            error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
            helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
            required
          />
        </Grid>
        <Grid size={{xs:12 , md:4 , lg:3}}>
          <TextField 
            fullWidth
            id='sellingPrice'
            name='sellingPrice'
            label="Selling Price"
            type='number'
            value={formik.values.sellingPrice}
            onChange={formik.handleChange}
            error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
            helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
            required
          />
        </Grid>
        <Grid size={{xs:3 , md:4 , lg:3}}>
          <TextField 
            fullWidth
            id='color'
            name='color'
            label="color"
            type='number'
            value={formik.values.color}
            onChange={formik.handleChange}
            error={formik.touched.color && Boolean(formik.errors.color)}
            helperText={formik.touched.color && formik.errors.color}
            required
          />
        </Grid>
      </form>
    </div>
  )
}

export default SellerAddProduct