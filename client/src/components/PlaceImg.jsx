import React from "react";
import BASE_URL from "../../constants/defaulturl";

const PlaceImg = ({ place, index = 0, className = "object-cover" }) => {
  return (
    <>
      {place.photos.length > 0 && (
        <img
          className={className}
          src={`${BASE_URL}/uploads/` + place.photos[index]}
        />
      )}
    </>
  );
};

export default PlaceImg;
