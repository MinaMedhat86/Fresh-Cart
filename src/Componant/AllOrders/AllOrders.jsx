import axios from "axios";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import { ThreeCircles } from 'react-loader-spinner'

import { Helmet } from "react-helmet";

export default function AllOrders() {

    let decodeToken = jwtDecode(localStorage.getItem("userTaken"))
  // console.log(decodeToken.id);

  const[myOrders , setMyOrders] = useState(null)
  const[isLoading , setIsLoading] = useState(true)


  async function getMyOrders(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decodeToken.id}`)
    setMyOrders(data);
    setIsLoading(false)
    console.log(data);
  }


  useEffect(()=>{getMyOrders () ;
   
}
, [])

  return<>
  <Helmet>
                <meta charSet="utf-8" />
                <title>All Orders</title>
            </Helmet>
  
  <div className="container py-5 ">
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
  
       <div className="row ">

       <h2 className="text-center fw-bolder display-5 text-main border-bottom pb-2 mb-4"> My Orders</h2>
       { myOrders ? myOrders.map((order)=><>
       {
       order.cartItems.map((item)=><>
       <div className="d-flex justify-content-between bg-main-light p-5 mb-4 rounded-4">
       <div className="col-md-2 ">
        <img src={item.product.imageCover} className=" img-fluid rounded-2" alt={item.product.title} />
       </div>
       <div className="col-md-9">
       <p className="h4 mt-4" ><span className="text-main fw-bold">Count : </span>{item.count} </p>
        <p className="h4 mt-3" ><span className="text-main fw-bold">Title : </span>{item.product.title}</p>
        <p className="h4 mt-3" ><span className="text-main fw-bold">Price : </span>{item.price} EGP</p>
        <p className="h4 mt-3 border-bottom pb-3">
        <span className="text-main fw-bold">Rating : </span>
           
           {item.product.ratingsAverage}
           <i className='fa fa-star rating-color ms-2'></i>
         </p>
         {/* <h2 className=" position-relative start-50 translate-middle-x mt-2 bg-main text-white text-center rounded-3 fw-bolder w-25" > {item.count}</h2> */}
       </div>
       </div>
   
       </>)
       }
       
       
       </> )
      : "" 
      }
  
  
  
     </div>
  
      }
     
     </div>
    
    </>
}
