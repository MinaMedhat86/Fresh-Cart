
import { CartContext } from '../../Context/CartContext';
import Style from './Cart.module.css';
import React, { useContext, useEffect, useState } from 'react'

import { Link } from "react-router-dom"

import { ThreeCircles } from 'react-loader-spinner'

import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";

export function Cart() {



  const[isLoading , setIsLoading]=useState(true)

  let {getLoggedToCart , removeProductItem , updateCountQuintity , deleteCart , countNumber , setCountNumber} = useContext(CartContext);

  const [cartProduct , setCartProduct] = useState(null)

  
  async function removeProductFromCart(idProduct){
    let {data} = await removeProductItem(idProduct);
    if(data.status === "success"){
      toast.error('Delete Product Completed' , {
        duration: 4000,
        position: 'top-center',

        className: 'mt-2 bg-danger text-white',
      
      });
    }
    setCartProduct(data)
    setCountNumber(data.numOfCartItems)
    setIsLoading(false);
    
  }



  

  async function addProductToCart(){
    let {data} = await getLoggedToCart();
    setCartProduct(data)
    setCountNumber(data.numOfCartItems)
    setIsLoading(false);

    console.log(data);
    
  }


  async function updateCount(idProduct , count){
    let {data}= await updateCountQuintity(idProduct , count);
    if(data.status === "success"){
      toast.success('Successfully Update Count' , {
        duration: 4000,
        position: 'top-center',

        className: 'mt-2 bg-main text-white',
      
      });
    }
    setCartProduct(data)
  
  }

  async function deleteCartFromApp(){
    let {data} = await deleteCart();  
    setCartProduct(null)
    setCountNumber(data.numOfCartItems)

  }
  // console.log(countNumber);
  
  useEffect(()=>  {addProductToCart()}  , []);
  
  return <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Cart </title>
            </Helmet>

<div className="container bg-main-light my-3 pb-4 rounded-3">
<h2 className='text-center fw-bolder py-4'>
     Shopping Cart   <i className='ms-2 fa-solid fa fa-shopping-basket text-main'></i>  
      </h2>
{cartProduct?<>
      <div className='d-flex justify-content-between'>
        <div>
        <p className="fw-bolder pb-3 ms-5 h5"> Total Cart Items :- <span className=' text-main'>{cartProduct.numOfCartItems}</span></p>
        <p className="fw-bolder pb-3  ms-5 h5"> Total Cart Price :- <span className=' text-main'>{cartProduct.data.totalCartPrice} EGP</span></p>
        </div>

        <div>
        <button className='btn btn-danger me-2 mt-3 py-2 mb-5 px-5 ' onClick={()=> deleteCartFromApp()}>
      Delete All Products <i className='fa fa-solid fa-remove ms-2'></i>
      </button>  
        </div>
      </div>

      
      {cartProduct.data.products.map((product)=><>
        <div className="row my-2 border-bottom" key={product._id}>
          <div className="col-md-1">
            <img className=' ms-3 pb-2 img-fluid' src={product.product.imageCover} alt={product.product.title} />
          </div>
          <div className="col-md-11">
          <div className='d-flex justify-content-between'>
            <div className='ms-2'>
              <p className=' fw-semibold pt-2'> {product.product.title}</p>
              <p className="fw-semibold"> Price :- <span className=' text-main'>{product.price} EGP</span> </p>

              <button onClick={()=>removeProductFromCart(product.product._id)} className='btn text-danger fw-semibold ' >
                <i className='fa me-1 fa-solid fa-trash'></i>
                remove </button>

            </div>
            <div className='d-flex align-items-center me-2'>
              <button className='btn btn-outline-success' onClick={()=> updateCount(product.product._id ,product.count+1 )} >+</button>
              <p className=" fw-semibold pt-3 px-2">{product.count}</p>
              <button disabled={product.count<=1} className='btn btn-outline-success ' onClick={()=> updateCount(product.product._id , product.count-1 )}>-</button>
            </div>
          </div>
          </div>
        </div>
        
        
        </>)}
      </>: isLoading?  <div className='d-flex small-h'>
    <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass="align-items-center w-100 justify-content-center"
  />
    </div> :''

    
      }

   <Link to={"/userAddress"} className=' position-relative start-50 translate-middle-x btn bg-main text-white me-2 mt-3 py-2 mb-5 px-5 ' >
      Online Payment <i className='fa-regular fa-credit-card ms-2'></i>
      </Link> 
</div>

  </>
}

