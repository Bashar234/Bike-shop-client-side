import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const Payment = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const stripePromise = loadStripe(process.env.REACT_APP_stripe_key);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://server-six-nu.vercel.app/single/order/${id}`
      );
      setOrder(data.order);
    };
    fetchData();
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto p-3 my-10">
      <h1 className="text-xl font-bold my-2">Payment</h1>
      <hr />
      <div className="lg:w-96 w-full max-w-screen-xl mx-auto  p-4 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm order={order} />
        </Elements>
      </div>
    
  );
};

export default Payment;
