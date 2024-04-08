import React from 'react'


import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from "../../Assets/images/images/slider-image-1.jpeg"
import slider2 from "../../Assets/images/images/slider-image-2.jpeg"
import slider3 from "../../Assets/images/images/slider-image-3.jpeg"

import blog1 from "../../Assets/images/images/grocery-banner.png"
import blog2 from "../../Assets/images/images/grocery-banner-2.jpeg"

export function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 5,
        arrows : false,
        
      };

  return <>
  <div className=' container'>
    <div className='row py-3 gx-0'>
    <Slider {...settings} className=' col-md-9' >
    <img src={slider1} height={300}  alt="slider1" />
    <img src={slider2} height={300}   alt="slider2" />
    <img src={slider3} height={300}   alt="slider3" />
  </Slider>

  <div className='col-md-3'>
  <img src={blog1} height={150} className='w-100'  alt="blog1" />
    <img src={blog2} height={150}  className='w-100'    alt="blog2" />
  </div>
    </div>
  </div>

  
  
  </>
}
