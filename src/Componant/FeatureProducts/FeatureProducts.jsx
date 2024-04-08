import axios from 'axios'


import Style from './FeatureProducts.module.css';
import { ThreeCircles } from 'react-loader-spinner'
import { useQuery } from 'react-query';

import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import React, { useContext, useEffect, useState} from 'react'
import toast from 'react-hot-toast';

export  function FeatureProducts() {


  let{addToCart ,setCountNumber , getWhishlist, addToWhishlist, removeFromWhishlist } = useContext(CartContext)


  async function addCart(id){
    let response = await addToCart(id)
    // console.log(response.status );
    if(response.status === 200){
      toast.success('Successfully Added To Cart' , {
        duration: 4000,
        position: 'top-center',

        className: 'mt-2 bg-main text-white',
        
      
      }
      
    );
    setCountNumber(response.data.numOfCartItems)
    }
  }
//     const[fetProduct , setFetProduct]=useState([])
//     const[isLoading , setIsLoading]=useState(true)


// async function callFeatureProduct(){
//     let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    
//     console.log(data);
//     setFetProduct(data.data);
//     setIsLoading(false);
// }


// useEffect(()=>{
//     callFeatureProduct();
// } ,[])
const [wishIcon, setWishIcon] = useState([]);

const handleWishList = async (id) => {
  const isInWishlist = wishIcon.some((item) => item.id === id);

  if (isInWishlist) {
    await removeToWhishlist(id);
    setWishIcon(wishIcon.filter((item) => item.id !== id));
    toast.error('Remove From WishList' , {
      duration: 4000,
      position: 'top-center',

      className: 'mt-2 bg-danger text-white',
      
    
    });
  } else {
    await postToWhishlist(id);
    setWishIcon([...wishIcon, { id }]);
    toast.success(" Added successfully to your wishlist", {
      duration: 4000,
      position: 'top-center',

      className: 'mt-2 bg-main text-white',
    });
  }
};

async function showWhishlist() {
  let { data } = await getWhishlist();
  if (data.status == "success") {
    setWishIcon(data.data);
  }
}

useEffect(() => {
  showWhishlist();
}, []);

async function postToWhishlist(id) {
  let { data } = await addToWhishlist(id);
  if (data.status == "success") {
    showWhishlist();
  }
}
async function removeToWhishlist(id) {
  let { data } = await removeFromWhishlist(id);
  if (data.status == "success") {
    showWhishlist();
  }
}


function callFeatureProduct(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);

  
}
let {data , isLoading } = useQuery("featureProduct" , callFeatureProduct )
console.log(data);

  return <>


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

     <div className="row">

     
     {data?.data.data.map((element)=>   <div key={element.id} className='  col-md-6 col-lg-2'>
    
   <div className='product px-2 py-3'>
   <button onClick={() => handleWishList(element.id)} className={`position-relative end-0 border-0 bg-transparent`}>
                      <i className={`${wishIcon.map((id) => id.id).includes(element.id) ? "fa-solid" : "fa-regular"} fa-heart text-danger`}></i>
                    </button>
   <Link to={`/productDetails/${element.id}`}>
  
     <img src={element.imageCover} alt={element.title} className=' img-fluid' />
     <p className=' text-main small-title'> {element.category.name}</p>
     <h3 className='h6'> {element.title.split(" ").slice(0,3).join(' ')}</h3>
     <div className='d-flex justify-content-between'>
       <p> {element.price} EGP</p>
       <p>
         <i className='fa fa-star rating-color'></i>
         {element.ratingsAverage}
       </p>
     </div>

     
     </Link>
     <button className='btn bg-main text-white w-100' onClick={()=>addCart(element.id)}>Add to Cart</button> 
   </div>

 
   </div>)}



   </div>

    }
   
   </div>
  
  </>
    
  
}
