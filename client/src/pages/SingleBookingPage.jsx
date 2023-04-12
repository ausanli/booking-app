import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PhotoGallery from "../components/PhotoGallery";
import BookingDates from "../components/BookingDates";
import { differenceInCalendarDays } from "date-fns";

const SingleBookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.placeId.title}</h1>
      <AddressLink address={booking.placeId.address} />
      <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Your booking information</h2>
          <div className="my-3">
            <BookingDates booking={booking} />
          </div>
        </div>
        <div className="bg-primary m-1 p-6 text-white rounded-2xl">
          <div>Total price:</div>
          <div className="text-2xl">
            $
            {booking.price *
              differenceInCalendarDays(
                new Date(booking.checkout),
                new Date(booking.checkin)
              )}
          </div>
        </div>
      </div>

      <PhotoGallery place={booking.placeId} />
    </div>
  );
};

export default SingleBookingPage;
