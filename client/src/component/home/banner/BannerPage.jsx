import React from "react";
import Carousel from "react-bootstrap/Carousel";
import FirstSlide from "../../../assets/Images/FirstSlide.png";
import SecondSlide from "../../../assets/Images/SecondSlide.png";
import ThirdSlide from "../../../assets/Images/ThirdSlide.png";

const BannerPage = () => {
  return (
    <div>
      <>
        <div>
          <Carousel data-bs-theme="dark" indicators={false}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={FirstSlide}
                alt="First slide"
              />
           
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={SecondSlide}
                alt="Second slide"
              />
       
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={ThirdSlide}
                alt="Third slide"
              />
           
            </Carousel.Item>
          </Carousel>
        </div>
      </>
      )
    </div>
  );
};

export default BannerPage;
