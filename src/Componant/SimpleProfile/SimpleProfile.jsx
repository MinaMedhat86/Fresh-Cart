import React from 'react'
import Style from "./SimpleProfile.module.css"

import { jwtDecode } from "jwt-decode";

export  function SimpleProfile() {

    let decodeToken = jwtDecode(localStorage.getItem("userTaken"))

    // console.log(decodeToken);

  return <>
  
  <div className='container rounded-3 bg-main-light my-3'>
    <h2 className='text-center fw-bolder border-bottom py-3'>Profile
    <i className='fa fa-solid fa-user ms-2'></i>
    </h2>

    <div>
<p className='fw-bold ms-5 mt-3 fs-4'> Full Name :- <span className='text-main'>{decodeToken.name}</span></p>
<p className='fw-bold ms-5 mt-3 fs-4'> My Role :- <span className='text-main'>{decodeToken.role}</span></p>

<p className='mt-5 pb-5 ms-5 me-3 fs-5'>
     <span className='fw-bold border-bottom py-1'> Description :- </span> 
     <br />
     An ecommerce website is your digital storefront on the internet. It facilitates the transaction between a buyer and seller. It is the virtual space where you showcase products, and online customers make selections. Your website acts as the product shelves, sales staff, and cash register of your online business channel.</p>
    </div>
  </div>
  
  </>
}
// useEffect(() => {

//   // Fetch products from the API
//   axios.get("https://ecommerce.routemisr.com/api/v1/products")
//     .then((response) => {
//       console.log(response?.data?.data);
//       setProducts(response?.data?.data);

//     })
//     .catch((error) => {
//       console.error("Error fetching products:", error);
//     });
// }, []);

// const handleSearchTermChange = (event) => {
//   setSearchTerm(event.target.value);
// };

// let filteredProducts = products;

// if (searchTerm) {
//   filteredProducts = products.filter((product) =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   console.log(filteredProducts);
// }