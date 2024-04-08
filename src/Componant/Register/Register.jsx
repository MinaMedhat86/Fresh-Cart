import Style from './Register.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Helmet } from "react-helmet";

export function Register() {

  let regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  let regexPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


let navigate = useNavigate() 
const [errorMessage , setErorrMessage] = useState("")
const [isLoading, setIsLoading] = useState(false);

  async function submitRegister (values){
    setIsLoading(true)
    setErorrMessage("");
     let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
     .catch(error => {
      setIsLoading(false)
      setErorrMessage(error.response.data.message)}
      )
   
    if (data.message == "success"){
        navigate("/Login")
    }
  }

  let validationSchema = Yup.object ({
    name : Yup.string().min(3 , "Min Lenght is 3 Char").max(11 , "Max Lenght is 11 Char").required("This Field is Required"),
    email : Yup.string().email("Invalid Email").required("This Field is Required"),
    phone : Yup.string().matches(regexPhone , "Phone num is Invalid").required("This Field is Required"),
    password : Yup.string().matches(regexPass , "Password must have 8 char and min 1 num and 1 special char").required("This Field is Required"),
    rePassword : Yup.string().oneOf([Yup.ref("password")]  , "password not equil rePassword").required("This Field is Required")
  })
  let formik = useFormik ({
    initialValues:{
    name :"",
    phone : "",
    email : "",
    password : "",
    rePassword : ""
    },
    validationSchema,

    onSubmit : submitRegister
  })
  

// let errors = {}
//   function validate (values){

//   let regexEmail = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  
//   if (!values.name){
//     errors.name = "Name is Required";
//   }else if (values.name.length < 3){
//     errors.name = "Min Lenght is 3 Char"
//   }else if (values.name.length > 11){
//     errors.name = "Max Lenght is 11 Char"
//   }

//   if (!values.email){
//     errors.email = "Email is Required";
//   }else if (!regexEmail.test(values.email)){
//     errors.email = "Email is not Valide"
//   }

// return errors;
//   }
  return <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>

  <div className='w-50 mx-auto py-5'>
    <h2 className="fw-bolder text-center pb-3">Register Now ..</h2>
    <form onSubmit={formik.handleSubmit}>

{errorMessage? <div className='alert alert-danger'> Account Already Exists </div> : null}

  <label htmlFor="name" className='ps-2 fw-semibold fs-5'>Name : </label>
  <input type="text" name='name' className='form-control mb-2' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id='name' />
  { formik.errors.name && formik.touched.name ? <div className="alert alert-danger py-2 my-1">{formik.errors.name}</div> : ""}
  
    <label htmlFor="phone" className='ps-2 fw-semibold fs-5'>Phone Number :</label>
  <input name='phone' type="tel" className='form-control mb-2' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id='phone' />
  {formik.errors.phone && formik.touched.phone? <div className='alert alert-danger py-2 my-1'>{formik.errors.phone}</div> : "" }

    <label htmlFor="email" className='ps-2 fw-semibold fs-5'>E-Mail : </label>
  <input name='email' className='form-control mb-2' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' />
  {formik.errors.email && formik.touched.email? <div className='alert alert-danger py-2 my-1'>{formik.errors.email}</div> : "" }

    <label htmlFor="password" className='ps-2 fw-semibold fs-5'>Password :</label>
  <input name='password' type='password' className='form-control mb-2' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' />
 {formik.errors.password && formik.touched.password? <div className='alert alert-danger py-2 my-1'>{formik.errors.password}</div> : "" }

    <label htmlFor="rePassword" className='ps-2 fw-semibold fs-5'>rePassword :</label>
  <input name='rePassword' type='password' className='form-control mb-2' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id='rePassword' />
 {formik.errors.rePassword && formik.touched.rePassword? <div className='alert alert-danger py-2 my-1'>{formik.errors.rePassword}</div> : "" }

<button type="submit" disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main mt-3 px-5 py-2 position-relative start-50 translate-middle-x text-white'>
  {isLoading? <i className='fa-spin fa-spinner fa'></i> : "Rigister"}
   
   
   </button>
</form>
  </div>


  
  
  </>
}
