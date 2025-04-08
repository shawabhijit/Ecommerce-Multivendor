import DealCard from './DealCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

const Deal = () => {
    const settings = {
        dots: true,
        infinite : true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000, // time in milliseconds between slides (3 seconds here)
        cssEase: "linear",
        pauseOnHover: true,
    }
    return (
        <div className='py-5 lg:px-20'>
         
                <Slider {...settings}>
                    {
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => <DealCard key={item} />)
                    }
                </Slider>

           
        </div>
    )
}

export default Deal