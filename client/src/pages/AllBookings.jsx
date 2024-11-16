import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookingCard from './BookingCard'; // Import the new component

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    await axios.get('http://localhost:6001/fetch-bookings').then(
      (response) => {
        setBookings(response.data.reverse());
      }
    );
  };

  const cancelTicket = async (id) => {
    await axios.put(`http://localhost:6001/cancel-ticket/${id}`).then(
      (response) => {
        alert("Ticket cancelled!");
        fetchBookings();
      }
    );
  };

  return (
    <div className="user-bookingsPage">
      <h1>All Bookings</h1>
      <div className="user-bookings">
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onCancelTicket={cancelTicket}
          />
        ))}
      </div>
    </div>
  );
};

export default AllBookings;