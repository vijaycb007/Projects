import React from "react";

function Pagination({handleNext, handlePrev, pageNo}) {
  return (
    <div className="bg-gray-400/50 p-4 mt-8 flex justify-center w-full rounded-xl">
      <div onClick={handlePrev} className="px-8">
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div className="font-bold">{pageNo}</div>
      <div onClick={handleNext} className="px-8">
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default Pagination;
