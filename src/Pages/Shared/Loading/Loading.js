import React from "react";

const Loading = () => {
  return (
    <section>
      <div
        className="spinner-grow w-1/3 mx-auto inline-block bg-current rounded-full opacity-0 "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </section>
  );
};

export default Loading;
