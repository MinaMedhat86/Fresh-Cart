import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();



 function updateCountQuintity(id , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {count} , {
            headers : {
                token : localStorage.getItem("userTaken")
            }
        }).then ((response)=>response).catch ((error)=>error)
    }

function deleteCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers : {
                token : localStorage.getItem("userTaken")
            }
        }).then ((response)=>response).catch ((error)=>error)
}

    function getLoggedToCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers : {
                token : localStorage.getItem("userTaken")
            }
        }).then ((response)=>response).catch ((error)=>error)
    }

    function removeProductItem(idProduct){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${idProduct}` , {
            headers : {
                token : localStorage.getItem("userTaken")
            }
        }).then ((response)=>response).catch ((error)=>error)
    }


function addToCart(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {productId:id} ,
    {
headers : {
    token : localStorage.getItem("userTaken")
}
    }).then ((response)=>response).catch ((error)=>error)
}



export default function CartContextProvider(props){
    const [wishcount, setWishCount] = useState(0);
    const[countNumber , setCountNumber]=useState("")
    let [cardId , setCardId] = useState("")
   

    async function onlinePayment (cardId, values){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:3000` ,{
            shippingAddress:values} ,  {
                headers : {
                    token : localStorage.getItem("userTaken")
                }
                    }).then ((response)=>response).catch ((error)=>error)
      
      }
    

      function getWhishlist() {
        return axios
          .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: {token : localStorage.getItem("userTaken")}
          })
          .then((response) => {
            setWishCount(response.data.count);
            return response;
          })
          .catch((err) => err);
      }
      function addToWhishlist(productId) {
        return axios
          .post(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
              productId: productId,
            },
            {
                headers : {
                    token : localStorage.getItem("userTaken")
                }
                    }).then ((response)=>response).catch ((error)=>error)
      }
      function removeFromWhishlist(productId) {
        return axios
          .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers : {
                token : localStorage.getItem("userTaken")
            }
                }).then ((response)=>response).catch ((error)=>error)
      }

//     async function getUserOrders(cardId){
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cardId}`)
//     .then ((response)=>response).catch ((error)=>error)
//     ;
//   }



async function addCountNumber (){

    let {data} = await getLoggedToCart();
    setCountNumber(data?.numOfCartItems)
    setCardId(data?.data._id);
}

// async function productCart(){
//     let {data} = await getLoggedToCart()
//     setCardId(data.data._id);
//     console.log(cardId);
// }


useEffect(()=>{addCountNumber () ;
    // productCart ()
}
, [])




    return <CartContext.Provider value={{ cardId , removeFromWhishlist, addToWhishlist ,getWhishlist , addToCart , getLoggedToCart ,  removeProductItem , updateCountQuintity ,deleteCart , countNumber , setCountNumber , onlinePayment}}>
        {props.children}

    </CartContext.Provider>
}
