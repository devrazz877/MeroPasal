import React, { useEffect } from "react";
import BannerPage from "./banner/bannerPage";
import TopPicks from "../../pages/topPicks/TopPicks";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/features/productSlice";
import Spinner from "react-bootstrap/Spinner";

const Home = () => {
  const { products, loading, error } = useSelector((state) => state.product);
  console.log(products)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="font-sans">
        <BannerPage />
      </div>
      <div className="container ms-auto py-8">
        {loading ? (
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {products.map((product, index) => (
                <TopPicks key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
