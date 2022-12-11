import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useNavigation } from "react-day-picker";
import { useLoaderData } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
  const booking = useLoaderData();
  // const navigation = useNavigation();
  const { treatment, price, slot, appointmentDate } = booking;

  // if (navigation.state === "loading") {
  //   return <Loading></Loading>;
  // }

  return (
    <div>
      <h2 className="text-3xl text-center lg:mt-10">Payment for {treatment}</h2>
      <p className="text-lx text-center my-4">
        Please Pay <strong>$</strong>
        {price} for your appointment on {appointmentDate} at {slot}
      </p>
      <div className="w-96 mx-auto mt-16">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
