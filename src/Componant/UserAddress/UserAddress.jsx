
import { useFormik , Formik } from 'formik';
import * as Yup from "yup"
import { Link } from 'react-router-dom';

import {UserContext} from "../../Context/UserContext"

import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios';

import {Helmet} from "react-helmet"
import { CartContext } from '../../Context/CartContext';

export function UserAddress() {


    const [isLoading , setIsloading] = useState(false)
  let {cardId , onlinePayment} =   useContext(CartContext)

    let formik = useFormik({
        initialValues:{
          details : "",
          phone : "" , 
          city : ""
        },
        
        onSubmit : handleSubmit
      })

 
async function handleSubmit ( values){
    let response = await onlinePayment( cardId , values)
    console.log(cardId);
    window.location.href = response.data.session.url;

}


  return <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>User Address</title>
            </Helmet>

  <div className='w-50 mx-auto py-5'>
    <h2 className="fw-bolder text-center pb-3">User Address..</h2>

    
    
    <form onClick={formik.handleSubmit}>

    <label htmlFor="details" className='ps-2 fw-semibold fs-5'>Details : </label>
      <input name='details' type="text" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' id='details' />
    
      <label htmlFor="phone" className='ps-2 fw-semibold fs-5'>Phone Number : </label>
      <input name='phone' type="tel" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' id='phone' />

      <label htmlFor="city" className='ps-2 fw-semibold fs-5'>City : </label>
      <input name='city' type="text" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' id='city' />

      <button type="submit" disabled= {!(formik.dirty)} className='btn bg-main mt-3 px-5 py-2 position-relative start-50 translate-middle-x text-white'>
        {isLoading ? <i className='fa fa-spin fa-spinner'></i> : "Payment"}
        </button>
        <br/>
        <Link to="/cart" className='btn fw-semibold text-primary position-relative start-50 translate-middle-x mt-1'> Back to cart </Link>
    </form>
  </div>
  
  </>
}
