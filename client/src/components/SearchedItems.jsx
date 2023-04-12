import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import AllItems from "./AllItems";
import NotFound from "./NotFound";

const SearchedItems = () => {
  const [places, setPlaces] = useState([]);
  const location = useLocation();
  const searchedItem = location.state?.searchItem;

  useEffect(() => {
    axios.get(`/search/?q=${searchedItem}`).then((response) => {
      let places = response.data;
      setPlaces(places);
    });
  }, [searchedItem]);

  if (places.length === 0) {
    return <NotFound searchedItem={searchedItem} />;
  }
  return <AllItems places={places} />;
};

export default SearchedItems;
