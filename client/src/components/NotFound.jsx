import React from "react";
import noresults from "../assets/noresults.png";

const NotFound = ({ searchedItem }) => {
  return (
    <div className="flex gap-9 justify-center items-center mt-20 font-semibold text-2xl text-gray-600">
      No properties found for {searchedItem}
      <img className="h-10 w-10" src={noresults}></img>
    </div>
  );
};

export default NotFound;
