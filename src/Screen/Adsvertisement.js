import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "./Modal";

const Adsvertisement = () => {
  const rol = JSON.parse(localStorage.getItem("User"));
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [flip, setFlip] = useState(false);
  const [flipId, setFlipId] = useState(0);
  const [loader, setLoader] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { data: allProduct, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      setLoader(true);
      const res = await fetch("https://server-six-nu.vercel.app/all-product");
      const data = await res.json();
      setLoader(false);
      return data.product;
    },
  });
  const adsProduct = allProduct?.filter((item) => item.ads && !item.payment);
  //console.log(adsProduct);

  const bookingData = (item) => {
    setModalData(item);
    setShowModal(true);
  };
  const handleCard = (id) => {
    setFlip(!flip);
    setFlipId(id);
  };
  return (
    <div>
      {adsProduct?.length > 0 && (
        <div className="my-10 mx-5 max-w-screen-xl lg:mx-auto">
          <h1 className="font-bold text-2xl my-10 ">
            Recommended Product({adsProduct?.length})
         
          <Carousel responsive={responsive}>
            {adsProduct?.length > 0 &&
              adsProduct.map((item, idx) => (
                <div>
                  <div>
                    <div className="card p-2  bg-base-100 shadow-xl">
                      <h1>
                        {item.verified ? (
                          <div className="verifyIcon">
                            <i className="fas fa-2x fa-check-circle"></i>
                          </div>
                        ) : (
                          <div>
                            <h1 className="mt-8"></h1>
                          </div>
                        )}
                      </h1>
                      <figure className="px-10">
                        <img
                          src={item.imgUrl}
                          alt="laptop"
                          className="rounded-xl w-full"
                        />
                      </figure>
                      <div className="card-body text-md font-semibold">
                        <h2 className="card-title">{item.name}</h2>
                        <h1 className="">Price:{item.soldPrice}</h1>
                      </div>
                      <label
                        onClick={() => bookingData(item)}
                        htmlFor="bookModal"
                        className="btn  btn-primary"
                      >
                        Book Now
                      </label>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
          <div>
            {showModal && (
              <Modal setModalData={setModalData} modalData={modalData} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Adsvertisement;
