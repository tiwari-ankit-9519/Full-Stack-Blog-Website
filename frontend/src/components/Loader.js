import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black z-[9999]">
      <div className="text-xl text-white flex gap-2 items-center">
        <span className="animate-spin">C</span>
        Loading...
      </div>
    </div>
  );
};

export default Loader;
