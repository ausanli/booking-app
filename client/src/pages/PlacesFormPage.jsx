import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuests, setGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setCountry(data.country);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckin(data.checkin);
      setCheckout(data.checkout);
      setGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const inputHeader = (text) => {
    return <h2 className="text-xl font-semibold mt-4">{text}</h2>;
  };
  const inputDescription = (text) => {
    return <p className="text-gray-500">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      country,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkin,
      checkout,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put("/places", { id, ...placeData });
      setRedirect(true);
    } else {
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput("Title", "Title for your place should be short and catchy")}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title, ex. My lovely appartment"
        />
        {preInput("Address", "Address of the place location")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        {preInput("Country", "Country of the place location")}
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        />
        {preInput("Photos", "Better to have more photos")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Describe your place")}
        <textarea
          placeholder="Description here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {preInput("Perks", "List the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra Info", "Any additional info, like house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Check in&out times, max guests",
          "Add check in and out times, remember to have some time window for cleaning the room"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cold-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="number"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="number"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              placeholder="10"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="ex. 2"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="ex. 2"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
