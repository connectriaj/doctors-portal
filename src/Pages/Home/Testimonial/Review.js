import React from "react";

const Review = ({ review }) => {
  const { name, img, review: userReview, location } = review;
  return (
    <div>
      <div className="card shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{userReview}</p>
          <div className="card-actions justify-start items-center gap-4 mt-9">
            <div className="avatar">
              <div className="w-18 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={img} alt="img" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold">{name}</h4>
              <p>{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
