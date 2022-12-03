import React from "react";
import treatment from "../../../assets/images/treatment.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const Care = () => {
  return (
    <div className="card card-side bg-base-100 shadow-xl mt-20 lg:flex-row flex-col justify-between items-center gap-10 rounded-2xl">
      <div className="">
        <figure>
          <img
            className="lg:h-[576px] lg:w-[458px]"
            src={treatment}
            alt="Album"
          />
        </figure>
      </div>
      <div className="card-body">
        <h2 className="card-title lg:text-4xl">
          Exceptional Dental Care, on Your Terms
        </h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
          odio natus quae nemo aliquam, animi explicabo a fuga quisquam qui.
        </p>
        <div className="card-actions justify-start">
          <PrimaryButton>Show More</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Care;
