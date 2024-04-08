import axios from 'axios';
import Style from './CategorySlider.module.css';
import React from 'react'
import { useQuery } from 'react-query';


import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function CategorySlider() {


    function getCategorySlider(){


        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
    let {data} = useQuery("categorySlider" , ()=> getCategorySlider())
    console.log(data?.data.data);

    var settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 7,
        slidesToScroll: 5
      };


  return <>
{data?.data.data ? <Slider {...settings} className='container py-3'>
  {
    data?.data.data? data?.data.data.map((category)=><>
    <img key={category._id} src={category.image}  alt={category.name}  height={250}/> 
    <p className='ms-1 mt-1 small-title text-main fw-semibold'>{category.name}</p>
    </>
    
    
    ):""
  }
</Slider>

 :"" }
  </>
}


