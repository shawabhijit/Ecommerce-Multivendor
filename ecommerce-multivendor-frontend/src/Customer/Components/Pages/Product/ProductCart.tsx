import React from 'react'

const images = [
  "https://m.media-amazon.com/images/I/71eUwDk8z+L._SX569_.jpg",
  "https://m.media-amazon.com/images/I/71mh8ZJZFuL._SX569_.jpg",
  "https://m.media-amazon.com/images/I/71vSLpVgZpL._SX569_.jpg",
]

const ProductCart = () => {
  return (
    <>
      <div className='group px-4 relative'>
        <div className='card'> 
          {
            images.map((image, index) => (
                <img className='card-media object-top' src={image} alt="" key={index} />
            ))
          }
          
        </div>
      </div>
    </>
  )
}

export default ProductCart