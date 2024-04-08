import { useParams } from 'react-router-dom';
import Style from './ProductDetails.module.css';

import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner'

import React, { useContext} from 'react'
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

import {Helmet} from "react-helmet"

export function ProductDetails() {
  let{setCountNumber} = useContext(CartContext)

  let{addToCart} = useContext(CartContext)
  async function addCart(id){
    let response = await addToCart(id)
    // console.log(response.status );
    if(response.status === 200){
      toast.success('Successfully Added To Cart' , {
        duration: 4000,
        position: 'top-center',

        className: 'mt-2 bg-main text-white',
      
      });
      setCountNumber(response.data.numOfCartItems);
    }
  }


    let{id} = useParams()
    function getProductDetails(id){


        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

  
    }
    let {data , isLoading } = useQuery("productDetails" , ()=>getProductDetails(id) )
    // console.log(data?.data.data);

  return <>
{
    data?.data.data ?  <div className="container py-5 ">
    {isLoading?  <div className='d-flex small-h'>
    <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass="align-items-center w-100 justify-content-center"
  />
    </div>


:
    <div className="row align-items-center">
        <div className='col-md-4'>
            <img className='w-100 rounded-2' src={data?.data.data.imageCover} alt={data?.data.data.title} />
        </div>
<Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data.data.title}</title>
            </Helmet>
        <div className='col-md-8'>
            <h2 className='h5 fw-bolder shadow-sm p-2'>{data?.data.data.title} </h2>
            <p className=' fst-italic '> {data?.data.data.description}</p>
            <h6 className=' fw-semibold text-main mt-1'>{data?.data.data.category.name}</h6>
            <div className='d-flex justify-content-between'>
                <p className='text-main'>price: {data?.data.data.price} EGP</p>
                <p>
                {data?.data.data.ratingsAverage }   
                <i className='fa fa-star rating-color'></i>
                
                </p>
                </div>
                <button onClick={()=>addCart(data?.data.data.id)} className='btn bg-main text-white fw-bolder w-100 mt-1'> Add To Cart</button>
        </div>

   </div>

    
}
   </div>
    :""
}
 
  </>

}
