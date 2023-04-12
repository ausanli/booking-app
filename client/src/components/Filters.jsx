import axios from "axios";
import React, { useState } from "react";

const Filters = ({ onFilter, closeModal }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [country, setCountry] = useState("");
  function handleFilter() {
    axios
      .get(
        `/places?minPrice=${minPrice}&maxPrice=${maxPrice}&country=${country}`
      )
      .then((response) => {
        let places = response.data;
        onFilter(places);
      });

    closeModal();
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-600 mt-4">Price Range</h2>
      <div className="flex items-center justify-center my-4">
        <div className="flex items-center">
          <label
            htmlFor="minPrice"
            className="mr-2 font-semibold text-gray-600"
          >
            Min Price:
          </label>
          <input
            type="number"
            id="minPrice"
            className="border border-gray-400 rounded py-1 px-2 mr-2"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="maxPrice"
            className="mr-2 font-semibold text-gray-600"
          >
            Max Price:
          </label>
          <input
            type="number"
            id="maxPrice"
            className="border border-gray-400 rounded py-1 px-2 mr-2"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-600 mt-8">Country</h2>
      <div className="flex my-4">
        <div className="flex items-center">
          <label
            htmlFor="maxPrice"
            className="mr-2 font-semibold text-gray-600"
          >
            Country:
          </label>
          <input
            type="text"
            id="country"
            className="border border-gray-400 rounded py-1 px-2 mr-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <button
          className="bg-gray-700 font-semibold text-white py-2 px-4 rounded-xl absolute bottom-6 right-12"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
    </>
  );
};

export default Filters;
