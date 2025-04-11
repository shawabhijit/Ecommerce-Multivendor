
const SimillerProductCard = () => {

    return (
        <>

            <div className='group px-4 relative hover:shadow-gray-400 hover:shadow-2xl m-1 cursor-pointer'>
                <div className='card'
                >
                    <img src="https://m.media-amazon.com/images/I/61Io5-ojWUL._AC_UF480,480_SR480,480_.jpg" alt="" />

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

export default SimillerProductCard