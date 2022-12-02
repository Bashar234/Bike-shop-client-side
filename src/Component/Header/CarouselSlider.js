import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const CarouselSlider = () => {
  return (
    
      <div className="CaroImg">
        <img
          className="img-fluid"
          src="https://cdn.bajajauto.com/-/media/Assets/bajajauto/bikes/pulsar-250-black/00.ashx"
        />
      </div>
      <div className="CaroImg">
        <img
          className="img-fluid"
          src="https://bd.gaadicdn.com/processedimages/yamaha/mt-15-2-0/640X309/mt-15-2-062e4b1493f453.jpg?tr=w-264"
        />
        
      </div>
    </Carousel>
  );
};

export default CarouselSlider;
