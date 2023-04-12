import React from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../constants/defaulturl";

const AllItems = ({ places }) => {
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <Link to={"/place/" + place._id} key={place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={`${BASE_URL}/uploads/` + place.photos?.[0]}
                  />
                )}
              </div>

              <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
              <h4 className="font-bold">{place.address}</h4>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default AllItems;
