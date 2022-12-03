import React from "react";
import chair from "../../../assets/images/chair.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="hero banner-img flex justify-between py-6 lg:py-40 lg:px-12">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} className="rounded-lg  lg:w-1/2" alt="img" />
        <div>
          <h1 className="lg:text-5xl text-2xl font-bold">Your New Smile Starts Here</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Banner;
