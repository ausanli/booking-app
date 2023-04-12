import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ closeModal }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate("/search", { state: { searchItem: searchValue } });
    closeModal();
  };
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-600 mt-4">
        Search by Title
      </h2>
      <div className="flex items-center justify-center my-4">
        <div className="flex items-center">
          <label
            htmlFor="placeName"
            className="mr-2 font-semibold text-gray-600"
          >
            Place Name:
          </label>
          <input
            type="text"
            id="placeName"
            className="border border-gray-400 rounded py-1 px-2 mr-2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-700 font-semibold text-white py-2 px-4 rounded-xl"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
