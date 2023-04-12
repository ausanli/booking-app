import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Filters from "../components/Filters";
import AllItems from "../components/AllItems";
import NotFound from "../components/NotFound";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <>
      <div onClick={openModal} className="flex gap-2 cursor-pointer mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
        <span className="font-bold text-gray-600"> Filters</span>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Filters onFilter={setPlaces} closeModal={closeModal} />
      </Modal>
      {places.length > 0 ? (
        <AllItems places={places} />
      ) : (
        <NotFound searchedItem={"such filters"} />
      )}
    </>
  );
};

export default IndexPage;
