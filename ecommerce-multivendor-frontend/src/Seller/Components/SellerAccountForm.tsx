import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import { useFormik } from 'formik';

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details"
]

const SellerAccountForm = () => {

  const formik = useFormik({
    initialValues: {
      mobile: '',
      otp: "",
      gstin: "",
      pickupAddress: {
        name: '',
        mobile: '',
        pincode: "",
        address: "",
        city: "",
        state: "",
        locality: ""
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDeatils: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: ""
    },
    validationSchema: "",
    onSubmit: (values) => {
      console.log('values', values)
    }
  })


  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (value: number) => () => {
    setActiveStep(activeStep + value)
    steps.length - 1 === activeStep && handleCreateAccount();
  }

  const handleCreateAccount = () => {
    if (steps.length - 1 === activeStep) setActiveStep(0);
  }

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {
          steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))
        }
      </Stepper>
      <section className='mt-20 space-y-10'>
        <div>
          {
            activeStep == 0 ? <BecomeSellerFormStep1 formik={formik} /> : ""
          }
        </div>
        <div className='flex items-center justify-between'>
          <Button onClick={handleStep(-1)} variant='contained' disabled={activeStep == 0}>
            Go back
          </Button>
          <Button onClick={handleStep(1)} variant='contained'>
            {
              activeStep >= (steps.length - 1) ? "Create Account" : "Continue"
            }
          </Button>
        </div>
      </section>

    </div>
  )
}

export default SellerAccountForm