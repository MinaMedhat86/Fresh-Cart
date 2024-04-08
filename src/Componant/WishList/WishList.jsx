import React, { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";

import {Helmet} from "react-helmet"

export default function WishList() {
  let { getWhishlist, removeFromWhishlist, addToCart, setCount } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);

  async function showWhishlist() {
    let { data } = await getWhishlist();
    if (data.status == "success") {
      setCart(data);
      setLoading(false);
    }
  }

  async function addCart(id){
    let response = await addToCart(id)
    // console.log(foundItem );
    if(response.status === 200){
      toast.success('Successfully Added To Cart' , {
        duration: 4000,
        position: 'top-center',

        className: 'mt-2 bg-main text-white',
      
      });
      
    }
  }



  async function removeToWhishlist(id) {
    let { data } = await removeFromWhishlist(id);

    if (data.status == "success") {
      showWhishlist();
      toast.error(data.message, {
        duration: 4000,
        position: 'top-center',
  
        className: 'mt-2 bg-danger text-white',
      });
    }
  }



  useEffect(() => {
    showWhishlist();
  }, []);

  return (
    <>

<Helmet>
                <meta charSet="utf-8" />
                <title>WishList</title>
            </Helmet>

      <section className="py-5">
        <div className="container bg-main-light rounded-3">
          <div className="p-2">
            <h3 className=" text-center fw-bolder  my-4">WishList
<i className=" fa fa-solid fa-heart text-danger ms-2"></i>
            </h3>
            {loading ? (
              <div className="loading">
                <ThreeCircles visible={true} height={100} width={100} color="#0aad0a" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="justify-content-center" />
              </div>
            ) : cart ? (
              <>
                <p className="text-main ms-4 fs-5 fw-bold">
                  Number Of WishList : <span className="text-danger">{cart.count}</span>
                </p>
                {cart.data.map((product, index) => (
                  <div key={index} className="row align-items-center p-2 pb-3 m-0 mb-3 border-1 border-bottom">
                    <div className="col-md-2">
                      <img src={product.imageCover} className="w-100" alt={product.title} />
                    </div>
                    <div className="col-md-8">
                      <div >
                        <h3 className="h5 fw-bold">{product.title.split(" ").slice(0, 3).join(" ")}</h3>
                        <p className="text-main fw-bold">
                          Price : <span className="text-danger">{product.price} EGP</span>
                        </p>
                        <button onClick={() => removeToWhishlist(product._id)} className="btn">
                          <i className="fas fa-trash-can text-danger"></i> Remove
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2  ">
                      <div className="d-flex">
                        <button onClick={() => addCart(product.id)} className="btn bg-main text-white text-main-light w-100 btn-sm">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h2>WishList Is Empty ...</h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
}