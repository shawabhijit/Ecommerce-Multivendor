import React, { useState } from 'react'
import FilterSection from './FilterSection'
import ProductCart from './ProductCart'
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, useMediaQuery, useTheme } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';

const Product = () => {

    const isLarge = window.innerWidth > 1024; // Check if the screen width is greater than 1024px
    const [sort, setSort] = useState();
    const [page, setPage] = useState(1);

    const handleSortChange = (event: any) => {
        setSort(event.target.value);
    }
    // const theme = useTheme();
    // const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

    const handlePageChange = (value: number) => {
        setPage(value);
        // console.log(event.value)
    }


    return (
        <div className='-z-10 mt-10'>
            <div>
                <h1 className='text-3xl text-center font-bold text-gray-700 px-9 uppercase space-x-2'>Title of the Page</h1>
            </div>
            <div className='lg:flex'>
                <section className='filter_section hidden lg:block w-[20%]'>
                    <FilterSection />
                </section>
                <div className='w-full lg:w-[80%] space-y-5'>
                    <div className='flex justify-between items-center px-9 h-[40px] '>
                        <div className='relative w-[50%]'>
                            {
                                !isLarge &&
                                (
                                    <IconButton>
                                        <FilterAlt />
                                    </IconButton>
                                )
                            }
                            {
                                !isLarge &&
                                (
                                    <Box>
                                        <FilterSection />
                                    </Box>
                                )
                            }
                        </div>

                        <FormControl sx={{ width: 200 }} size="small" className='w-[30%]'>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                label="Age"
                                onChange={handleSortChange}
                            >
                                <MenuItem value={"price_low"}>price : Low - High</MenuItem>
                                <MenuItem value={"price_high"}>price : High - Low</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {/* <Divider /> */}
                    <section className='product_section grid sm:gtid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center mt-2'>
                        {
                            [1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1].map((item, index) => <ProductCart key={index} />)
                        }
                    </section>
                    <div className='flex justify-center py-10'>
                        <Pagination
                            onChange={(e, value) => handlePageChange(value)}
                            count={10}
                            shape="rounded"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Product