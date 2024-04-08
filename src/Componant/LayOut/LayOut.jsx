
import { Outlet } from 'react-router-dom';
import {Navbar} from "../Navbar/Navbar"
import {Footer} from "../Footer/Footer"

import Style from './LayOut.module.css';

import  {Offline , Online} from "react-detect-offline";

import React, { useContext } from 'react'
import { useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';

import  { Toaster } from 'react-hot-toast';


export function LayOut() {
  let {setUserToken} = useContext(UserContext)
  useEffect(()=>{
if (localStorage.getItem("userTaken") !== null){
  setUserToken(localStorage.getItem("userTaken"));
}

  } , [])
  return <>
  <Navbar/>
  <Outlet></Outlet>

 
  
  <Offline >
       
  <div className=' text-black'>
    <i className=' fa fa-solid fa-wifi'></i> you are Offline
</div>
</Offline>
<Toaster />
  <Footer/>




  </>
}
