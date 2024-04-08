
import axios from 'axios'

import Style from './Brands.module.css';
import { ThreeCircles } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import {Helmet} from "react-helmet";
import { useEffect, useState } from 'react';

export  function Brands() {
 
  // function callBrands(){
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  // }
  // let {data , isLoading } = useQuery("brands" , callBrands)
  // console.log(data?.data.data);

  const[brandItem , setBrandItem] = useState("")
  const[searchItem , setSearchItem] = useState("")
  const[isLoading , setIsLoading]=useState(true)


async function callBrands(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    setBrandItem(data.data);
    setIsLoading(false);
}

useEffect(()=>{
  callBrands();
  console.log(brandItem);
} ,[])
  
function handleFoundBrand(eventInfo){
  setSearchItem(eventInfo.target.value)
}

let foundBrand = brandItem;

if(searchItem){
  foundBrand = brandItem.filter((brand)=>
    brand.name.toLowerCase().includes(searchItem.toLowerCase())
  )
  // console.log(foundBrand);
}


    return <>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
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
        value={searchItem}
        onInput={handleFoundBrand}
        placeholder='Search By Title ...'  />

       {foundBrand.map((brand)=>   <div key={brand.id} className='  col-md-3 '>
    
     <div className=' mb-3 bg-black' key={brand.id}>
       <img src={brand.image} alt={brand.title} className='w-100' height={300} />
       <p className=' text-white text-center fw-bolder py-2 '> {brand.name}</p>
     </div>
     </div>)}
  
  
  
     </div>
  
      }
     
     </div>
    
    </>
      
    
  }
