import React from "react";
import { useLoaderData } from "react-router-dom";

const Payment = () => {
  const booking = useLoaderData();
  const { treatment, price, slot, appointmentDate } = booking;

  return (
    <div>
      <h2 className="text-3xl text-center lg:mt-10">Payment for {treatment}</h2>
      <p className="text-lx text-center my-4">
        Please Pay <strong>$</strong>
        {price} for your appointment on {appointmentDate} at {slot}
      </p>
    </div>
  );
};

export default Payment;
