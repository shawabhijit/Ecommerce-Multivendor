import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { teal } from '@mui/material/colors'
import { colorFilter, discountFilter, priceFilter } from "../../../Data/Filters/Filters"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterSection = () => {
  const [expendCollor , setExpendColor] = useState(false);
  const [searchParams , setSearchParams] = useSearchParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");


  const handleCollorToggle = () => {
    setExpendColor(!expendCollor);
  }

  const updateFilterParams = (e: any) => {
    const { name, value } = e.target;


    if (name === "color") setSelectedColor(value);
    else if (name === "price") setSelectedPrice(value);
    else if (name === "discount") setSelectedDiscount(value);

    //console.log(name , value)
    if (value) {
      searchParams.set(name, value);
    }
    else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  }

  const clearAllFilters = () => {
    console.log("clear all filters")

    // Clear state
    setSelectedColor("");
    setSelectedPrice("");
    setSelectedDiscount("");

    searchParams.forEach((value: any, key: any) => {
      //console.log(key , value)
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  }

  useEffect(() => {
    clearAllFilters();
  }, [])

  return (
    <div className='-z-50 space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
        <p className='text-lg font-semibold'>
          Filters
        </p>
        <Button onClick={clearAllFilters} size='small' className='text-teal-600 cursor-pointer font-semibold'>
          Clear All
        </Button>
      </div>
      <div className='px-9 space-y-6'>
        <section>
          <FormControl>
            <FormLabel
              sx={{ fontSize: "30px", fontWeight: "bold", color: teal[500], paddingBottom: "14px" }}
              className='text-2xl font-semibold'
              id='color'>
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="color"
              defaultValue=""
              name="color"
              value={selectedColor}
              onChange={updateFilterParams}
            >
              {
                colorFilter.slice(0, expendCollor?colorFilter.length:5).map((color) => <FormControlLabel key={color.hex} value={color.value} control={<Radio />}
                  label={<div className='flex items-center gap-3'>
                    <p>{color.label}</p>
                    <p className={`h-5 w-5 rounded-full ${color.label === "White" ? "border" : ""}`} style={{ backgroundColor: color.hex }}></p>
                  </div>} />)
              }
            </RadioGroup>
          </FormControl>
          <div>
            <Button 
            onClick={handleCollorToggle}
            className='text-[] cursor-pointer hover:text-teal-900 flex items-center' >
              {
                expendCollor ? "hide":`+${colorFilter.length - 5} more`
              }
            </Button>
          </div>
        </section>

        <section>
          <FormControl>
            <FormLabel
              sx={{ fontSize: "30px", fontWeight: "bold", color: teal[500], paddingBottom: "14px" }}
              className='text-2xl font-semibold'
              id='price'>
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="price"
              defaultValue=""
              name="price"
              value={selectedPrice}
              onChange={updateFilterParams}
            >
              {
                priceFilter.map((price) => <FormControlLabel value={price.value} key={price.label} control={<Radio />}
                  label={<div className='flex items-center gap-3'>
                    <p>{price.label}</p>
                  </div>} />)
              }
            </RadioGroup>
          </FormControl>
        </section>

        <section>
          <FormControl>
            <FormLabel
              sx={{ fontSize: "30px", fontWeight: "bold", color: teal[500], paddingBottom: "14px" }}
              className='text-2xl font-semibold'
              id='price'>
              Discount
            </FormLabel>
            <RadioGroup
              aria-labelledby="discount"
              defaultValue=""
              name="discount"
              value={selectedDiscount}
              onChange={updateFilterParams}
            >
              {
                discountFilter.map((price) => <FormControlLabel value={price.value} key={price.value} control={<Radio />}
                  label={<div className='flex items-center gap-3'>
                    <p>{price.label}</p>
                  </div>} />)
              }
            </RadioGroup>
          </FormControl>
        </section>
      </div>

    </div>
  )
}

export default FilterSection