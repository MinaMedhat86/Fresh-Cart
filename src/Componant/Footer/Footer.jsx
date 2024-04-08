
import Style from './Footer.module.css';


import React from 'react'

export function Footer() {
  return <>
  {/* <footer class=" bg-main-light pt-3">
      <p class="text-main text-center">© Copyright <span class="fw-bold">DevFolio.</span>  All Rights Reserved</p>
      <p class="text-main text-center"> Designed by <a href="#" class="text-decoration-none text-main">BootstrapMade</a></p>
    </footer> */}
  

        <section className=' pt-5 container-fluid bg-main-light'>
            <div className="row  text-main">
                <div className="col-md-4 text-center mb-3 ">
                    <h3 className='fw-semibold border-top border-bottom py-2'>LOCATION</h3>
                    <p>2215 John Daniel Drive</p>
                    <p>Clark, MO 65243</p>
                </div>
                <div className="col-md-4 text-center mb-5">
                    <h3 className='fw-semibold border-bottom border-top py-2'>AROUND THE WEB</h3>
                    <div className='social-icons d-flex justify-content-center'>
                        <div className="icon-item rounded-circle border border-success border-1">
                        <i className="fa-brands fa-facebook-f text-main m-2 "></i>
                        </div>
                        <div className="icon-item mx-3 rounded-circle border border-success border-1">
                        <i className="fa-brands fa-twitter text-main m-2 "></i>
                        </div>
                        <div className="icon-item rounded-circle border me-3 border-success border-1">
                        <i className="fa-brands fa-linkedin-in text-main m-2 "></i>
                        </div>
                        <div className="icon-item rounded-circle border border-success border-1">
                        <i className="fa-solid fa-globe text-main m-2 "></i>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 text-center text-main">
                    <h3 className=' fw-semibold border-bottom border-top py-2'>ABOUT FREELANCER</h3>
                    <p>Freelance is a free to use, licensed Bootstrap theme created by Route</p>
                </div>
            </div>
        </section>
  </>
}

