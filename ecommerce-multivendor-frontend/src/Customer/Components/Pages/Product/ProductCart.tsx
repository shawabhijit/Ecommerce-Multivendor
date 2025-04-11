import React, { useEffect, useState } from 'react'
import "./ProductCard.css"
import { Button } from '@mui/material';
import { Favorite, ModeComment } from '@mui/icons-material';
import { teal } from '@mui/material/colors';

const images = [
  "https://m.media-amazon.com/images/I/71eUwDk8z+L._SX569_.jpg",
  "https://m.media-amazon.com/images/I/71mh8ZJZFuL._SX569_.jpg",
  "https://m.media-amazon.com/images/I/71vSLpVgZpL._SX569_.jpg",
]

const ProductCart = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: any
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length)
      }, 1000)
    }
    else {
      clearInterval(interval);
      interval = null
    }
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <>
      <div className='group px-4 relative hover:shadow-gray-400 hover:shadow-2xl m-1'>
        <div className='card'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {
            images.map((image, index) => (
              <img className='card-media object-top' src={image} alt=""
                style={{
                  transform: `translateX(${(index - currentImage) * 100}%)`
                }}
                key={index} />
            ))
          }

          { 
            isHovered && <div className='indicator flex flex-col items-center space-y-2'>
              <div className='flex gap-3'>
                <Button variant='contained' color='inherit'><Favorite sx={{ color: teal[500] }} /></Button>
                <Button variant='contained' color="inherit"><ModeComment sx={{ color: teal[500] }} /></Button>
              </div>
            </div>
          }

        </div>
        <div className='details pt-3 space-y-1 group group-hover-effect rounded-md'>
          <div className='name'>
            <h1>Nike</h1>
            <p>Black t-shirt</p>
          </div>
          <div className='price flex items-center gap-3'>
            <span className='font-sans text-gray-800'>₹ 1600</span>
            <span className='thin-line-through text-gray-400'>₹ 9999</span>
            <span className='font-semibold text-[#00927c]'>60%</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCart