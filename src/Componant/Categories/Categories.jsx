
import axios from 'axios'

import Style from './Categories.module.css';
import { ThreeCircles } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


export  function Categories() {
 
  const[categoryItem , setCategoryItem] = useState("")
  const[searchItem , setSearchItem] = useState("")
  const[isLoading , setIsLoading]=useState(true)


async function callCategories(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategoryItem(data.data);
    setIsLoading(false);
}

useEffect(()=>{
  callCategories();
  // console.log(brandItem);
} ,[])
  
function handleFoundCategory(eventInfo){
  setSearchItem(eventInfo.target.value)
}

let foundCategory = categoryItem;

if(searchItem){
  foundCategory = categoryItem.filter((category)=>
  category.name.toLowerCase().includes(searchItem.toLowerCase())
  )
  // console.log(foundBrand);
}

  // function callCategories(){
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  // }
  // let {data , isLoading } = useQuery("categories" , callCategories)


  // console.log(data?.data.data);
  
    return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
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
        onInput={handleFoundCategory}
        placeholder='Search By Name ...'  />
       
       {foundCategory.map((category)=>   <div key={category.id} className='  col-md-4 '>
    
     <div className=' mb-3 product bg-light'>
       <img src={category.image} alt={category.title} className='w-100' height={300} />
       <p className=' text-main text-center fw-bold py-2 '> {category.name}</p>
     </div>
     </div>)}
  
  
  
     </div>
  
      }
     
     </div>
    
    </>
      
    
  }

