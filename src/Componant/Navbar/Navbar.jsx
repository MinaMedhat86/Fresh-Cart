
import Style from './Navbar.module.css';
import logo from "../../Assets/images/images/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react'
import {UserContext} from "../../Context/UserContext"
import { CartContext } from '../../Context/CartContext';
export function Navbar() {

let{countNumber , wishcount }=useContext(CartContext)
// console.log(countNumber);
  let {userToken , setUserToken} = useContext(UserContext);
let navigate = useNavigate();
  function logout (){
    localStorage.removeItem("userTaken");
    setUserToken(null)
    navigate("/login")
  }
  return <>
  
  <nav className="navbar navbar-expand-lg bg-body-tertiary  text-center ">
  <div className="container-fluid">
    <Link className="navbar-brand" href="/">
      <img src={logo} alt="Fresh market logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {userToken !== null ? <>
          <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
  </>: ""
        }
 
      </ul>

      <li className=" nav-item bg-main px-4 mb-lg-0 mb-3 py-1 p-1 rounded-1 align-center">
          <Link className="nav-link text-white text-center" to="/simpleProfile">
            <span className='fw-bolder '>Profile</span>
          <i className="fa-solid fa-user"></i>

          </Link>
        </li>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">

    

      <li className="nav-item d-flex justify-content-center my-2 my-lg-0 align-items-center">
      <i className="fa-brands mx-2 fa-facebook"></i>
      <i className="fa-brands mx-2 fa-twitter"></i>
      <i className="fa-brands mx-2 fa-instagram"></i>
      <i className="fa-brands mx-2 fa-tiktok"></i>
      <i className="fa-brands mx-2 fa-youtube"></i>
        </li>
        
        { userToken !== null ? <>

          <li className="nav-item">
          <Link className="nav-link" to="/wishlist">
                    <i className="fa-solid fa-heart text-danger fs-5"></i>
                  
                  </Link>
                  </li>

          <li className="nav-item">
          <Link className="nav-link" to="/cart">
            <i className='fa fa-solid fa-shopping-cart text-main fs-6'></i>
            <span className=' bg-main p-1 rounded-circle text-white'>{countNumber}</span>
            </Link>
        </li>
        
          <li className="nav-item">

          <span className="nav-link cursor-pointer" onClick={()=>logout()} >Logout</span>
        </li>

        </> :
        <>
            <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        </>
        }
    
     
      </ul>
    </div>
  </div>
</nav>
  </>
}
