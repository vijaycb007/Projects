import React from "react";
import image from "./assets/PageNotFound.jpg";

const PageNotFound = () => {
  return (
    <div className="h-[90vh] flex place-content-center items-center">
      <img src={image} alt="Page Not Found" className="h-100 w-150" />
    </div>
  );
};

export default PageNotFound;
