import React, { useContext, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const BookingWidget = ({ place }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkin && checkout) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkout),
      new Date(checkin)
    );
  }

  const bookPlace = async () => {
    const data = {
      placeId: place._id,
      checkin,
      checkout,
      numberOfGuests,
      name,
      email,
      phone,
      price: numberOfNights + place.price,
    };

    const response = await axios.post("/bookings", data);

    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="flex flex-col items-center p-4 bg-white shadow rounded-2xl">
      <div className="text-xl mb-5 ">Price: ${place.price} / per night</div>
      <div className="border rounded-2xl text-center">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in: </label>
            <input
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests: </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name: </label>
            <input
              type="text"
              placeholder="full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        {name && (
          <div className="py-1 px-4">
            <label>Your email: </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {email && (
          <div className="py-1 px-4">
            <label>Your phone number: </label>
            <input
              type="tel"
              placeholder="+000 000 000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookPlace} className="primary ">
        Book now
        {numberOfNights > 0 && (
          <span className="bold"> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
