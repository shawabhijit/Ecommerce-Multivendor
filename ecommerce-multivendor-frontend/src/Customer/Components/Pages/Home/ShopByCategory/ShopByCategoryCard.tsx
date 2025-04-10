import React from 'react'
import "./ShopByCategory.css"

const ShopByCategoryCard = () => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center cursor-pointer'>
        <div className='custom-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] rounded-full group '>
            <img className='group-hover:scale-95 transition-transform duration-700 object-cover object-top h-full w- rounded-full' src="https://imgs.search.brave.com/Aufkvi10tO5sPNNxKQal3R8QPKlPbnt9HkifMAZwOE8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM0/NTExMTM5OC9waG90/by9raXRjaGVuLWlu/dGVyaW9yLXdpdGgt/Zm9vZC1vbi1jb3Vu/dGVyLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz15WTZ3ZmFa/Rml2YTB1NXVGSC1j/cjNTejBaeWVQMlZL/VXpXb0U4VXh5Si1N/PQ" alt="" />
        </div>
        <h1>Kichen and table</h1>
    </div>
  )
}

export default ShopByCategoryCard