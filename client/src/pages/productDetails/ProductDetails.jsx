import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { clearError, singleProducts } from "../../redux/features/productSlice";
import { toast } from "react-toastify";
import Loader from "../../component/layout/loader/Loader";
import ReactStars from "react-rating-stars-component";

function ProductDetails() {
  const { product, loading, error } = useSelector((state) => state.product);
  const options = {
    edit: false,
    isHalf: true,
    value: product.ratings,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#ffd700",
    size: window.innerWidth < 600 ? 12 : 16,
  };

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    <div className="container mx-auto md:flex">
      <div className="md:w-1/2 relative">
        <img src={product?.productimage?.url} alt={product.productname} />
      </div>
      <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0">
        <h1>{product.productname}</h1>

        <p className="font-bold">Rs.{product.price}</p>
      </div>
    </div>;
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(singleProducts(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto md:flex">
          <div className=" bg-white-200 flex flex-col items-center p-1 space-y-1 ">
            <img
              src={product?.productimage?.url}
              alt={product.productname}
              style={{ height: "200px", width: "200px" }}
              className="w-32 h-32 object-cover rounded-md mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 sm:mb-4"
            />
            
            <span className="font-sans text-flex ">
            Discover the ultimate must-have product. Unleash a new level
            of performance and innovation with this cutting-edge masterpiece.
            Its sleek design, advanced features, and top-notch quality redefine
            excellence. Experience unrivaled functionality, seamless
            integration, and exceptional value. Elevate your lifestyle with
            this product
          </span>
            
          </div>
        
          <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0">
            <h1 className="font-bold text-xl text-green-900 text-uppercase">
              {product.productname}
            </h1>
            <p className="font-bold">Rs.{product.price}</p>

            <div className="flex items-center mb-2">
              <div className="mr-2">
                <span className="text-yellow-500">
                  <ReactStars {...options} />
                </span>
              </div>
              <div>
                <span className="text-gray-600">(Customer reviews)</span>
              </div>
            </div>
            <span
              className={product.isinstock ? "text-green-500" : "text-red-500 "}
            >
              {product.isinstock ? "Is in Stock" : "Out of Stock"}
            </span>
          </div>
         
        </div>
      )}
    </>
  );
}

export default ProductDetails;
