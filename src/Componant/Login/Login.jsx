
import { useFormik , Formik } from 'formik';
import Style from './Login.module.css';
import * as Yup from "yup"
import { Link } from 'react-router-dom';
import {UserContext} from "../../Context/UserContext"
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import {Helmet} from "react-helmet"

export function Login() {

  let {setUserToken} = useContext(UserContext);

  let regexPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
let validationSchema = Yup.object({
  email: Yup.string().email("Email is not Valid").required("This Field is Required"), 
  password : Yup.string().matches(regexPass , "Wrong Password").required("This Field is Required")
})

  let formik = useFormik({
    initialValues:{
      email : "",
      password : ""
    },
    validationSchema,
    onSubmit : callLogin

  
  })
const [erorrMessage , setErorrMessage] = useState("")
const [isLoading , setIsLoading] = useState(false)
let navigate = useNavigate()
  async function callLogin ( values){
    setErorrMessage("")
    setIsLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
    .catch (error =>{
        setErorrMessage(error.response.data.message);
        setIsLoading(false);
    })
    console.log(data);
    if(data.message == "success"){
      localStorage.setItem ("userTaken" , data.token);
      setUserToken(data.token);
        navigate ("/")
    }
    
  }
  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>LogIn</title>
            </Helmet>
  <div className='w-50 mx-auto py-5'>
    <h2 className="fw-bolder text-center pb-3">Login Now ..</h2>
    {erorrMessage ? <div className='alert alert-danger'>Incorrect email or password</div> : null}
    <form onClick={formik.handleSubmit}>
      <label htmlFor="email" className='ps-2 fw-semibold fs-5'>E-Mail : </label>
      <input name='email' type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2' id='email' />
      {formik.errors.email ? <div className='alert alert-danger py-1'>{formik.errors.email}</div> : null}
      

      <label htmlFor="password" className='ps-2 fw-semibold fs-5'>Password :</label>
      <input name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type='password' className='form-control mb-2' id='password' />
      {formik.errors.password ? <div className='alert alert-danger py-1'>{formik.errors.password}</div> : null}

      <button type="submit" disabled= {!(formik.isValid && formik.dirty)} className='btn bg-main mt-3 px-5 py-2 position-relative start-50 translate-middle-x text-white'>
        {isLoading ? <i className='fa fa-spin fa-spinner'></i> : "Login"}
        </button>
        <br/>
        <Link to="/register" className='btn fw-semibold text-primary position-relative start-50 translate-middle-x mt-1'> Register Now </Link>
    </form>
  </div>
  
  </>
}

