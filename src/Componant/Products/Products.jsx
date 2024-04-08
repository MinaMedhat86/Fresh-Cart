import axios from 'axios'
import Style from './Products.module.css';
import { ThreeCircles } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { CartContext } from '../../Context/CartContext';
import React, { useContext, useEffect, useState} from 'react'
import toast from 'react-hot-toast';


export  function Products() {

  let{setCountNumber , addToCart , getWhishlist, addToWhishlist, removeFromWhishlist} = useContext(CartContext)

  

  async function addCart(id){
    let response = await addToCart(id)
    // console.log(foundItem );
    if(response.status === 200){
      toast.success('Successfully Added To Cart' , {
        duration: 4000,
        position: 'top-center',

        className: 'mt-2 bg-main text-white',
      
      });
      setCountNumber(response.data.numOfCartItems);
    }
  }
 
  // function callProducts(){
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    
  // }
  // let {data , isLoading } = useQuery("products" , callProducts)
  // console.log(data);

  const[productItem , setProductItem] = useState("")
  const[searshItem , setSearchItem] = useState("")
  const[isLoading , setIsLoading]=useState(true)


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
    toast.success("Added successfully to your wishlist", {
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


async function callProducts(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    
    
    setProductItem(data.data);
    setIsLoading(false);
}


useEffect(()=>{
  callProducts();
} ,[])

function handleFoundProduct (eventInfo){
  setSearchItem(eventInfo.target.value);
}

let foundProduct = productItem;

if (searshItem){
  foundProduct= productItem.filter((product)=>
  product.title.toLowerCase().includes(searshItem.toLowerCase()));

  // console.log(foundProduct);
}







    return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
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
  
       <div className="row">
  
       <input
        type="text"
        className=' form-control mb-4'
        value={searshItem}
        onInput={handleFoundProduct}
        placeholder='Search By Title ...'  />

       {foundProduct.map((element)=>   <div key={element.id} className='  col-md-6 col-lg-2'>
    
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

