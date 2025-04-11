import { Button, Divider, FormControlLabel, IconButton, Modal, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import AddressCard from './AddressCard'
import { Box } from '@mui/system'
import { Add } from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import AddressForm from './AddressForm';
import PricingCart from '../Cart/PricingCart';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const paymentGatewayList = [
    {
        value: "Razorpay",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png",
        label: ""

    },
    {
        value: "stripe",
        image: "https://imgs.search.brave.com/qR-z7oabvjd_fmk0srFvNOU9ymPBnEIyu1OnQu_t168/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2JhL1N0cmlwZV9M/b2dvLF9yZXZpc2Vk/XzIwMTYuc3Zn",
        label: ""
    }
]

const Checkout = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [paymentGateway,setPaymentGateway] = useState("Razorpay");

    const handlePaymentCahnge = (event: any) => {
        setPaymentGateway(event.target.value)
    }

    return (
        <>
            <div className='pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen'>
                <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-12'>
                    <div className='col-span-2 space-y-5'>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-semibold'>Select Address</h1>
                            <Button onClick={handleOpen} sx={{ fontWeight: 600 }}>
                                Add new Address
                            </Button>
                        </div>
                        <div className='text-xs font-medium space-y-5'>
                            <p>Saved Addresses</p>
                            <div className='space-y-3'>
                                {
                                    [1, 1, 1].map((item) =>
                                        <AddressCard />
                                    )
                                }
                            </div>
                        </div>
                        <div className='py-2 flex items-center justify-center rounded-md'>
                            <Button onClick={handleOpen} variant='contained' sx={{ px: "20px", fontWeight: 600 }}>
                                <IconButton>
                                    <Add sx={{fontWeight: 900 }} />
                                </IconButton>
                                Add new Address
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='space-y-3 p-2 rounded-md'>
                                <h1 className='font-medium pb-2 text-center text-teal-600 text-sm'>Choose Payment gateway</h1>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    className='flex justify-between pr-0 pl-5'
                                    onChange={handlePaymentCahnge}
                                    value={paymentGateway}
                                >

                                    {
                                        paymentGatewayList.map(item => (
                                            <FormControlLabel className='w-[47%]' value={item.value} control={<Radio />} label={
                                                <img
                                                    className={`${item.value == "stripe" ? "w-15" : "w-30"}`}
                                                    src={item.image} alt={item.label} />
                                            } />
                                        ))
                                    }
                                </RadioGroup>
                            </div>
                        </div>
                        <Divider />
                        <div className=' rounded-md'>
                            <PricingCart />
                            <div className='p-2 font-extrabold'>
                                <Button sx={{ py: "11px", fontWeight:600}} variant='contained' fullWidth>
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddressForm />
                </Box>
            </Modal>
        </>
    )
}

export default Checkout