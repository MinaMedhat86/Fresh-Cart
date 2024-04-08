import React from "react";
import Style from "./NotFound.module.css";
import notFound from "../../Assets/images/images/error.svg";

export  function NotFound() {
  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="notfound text-center">
                <img src={notFound} alt="notFound" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
