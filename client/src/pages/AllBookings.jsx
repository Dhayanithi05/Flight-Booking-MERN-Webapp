import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    await axios.get('http://localhost:6001/fetch-bookings').then((response) => {
      setBookings(response.data.reverse());
    });
  };

  const cancelTicket = async (id) => {
    await axios.put(`http://localhost:6001/cancel-ticket/${id}`).then(() => {
      alert('Ticket cancelled!!');
      fetchBookings();
    });
  };

  return (
    <div className="user-bookingsPage">
      <h1>Bookings</h1>
      <div className="user-bookings">
        {bookings.map((booking) => {
          return (
            <div
              className={`user-booking ${booking.bookingStatus === 'cancelled' ? 'canceled' : ''}`}
              key={booking._id}
            >
              <div className="user-booking-header">
                Booking ID: {booking._id}
              </div>
              <div className="user-booking-body">
                <span>
                  <p><b>Mobile:</b> {booking.mobile}</p>
                  <p><b>Email:</b> {booking.email}</p>
                </span>
                <span>
                  <p><b>Flight:</b> {booking.flightName} ({booking.flightId})</p>
                </span>
                <span>
                  <p><b>From:</b> {booking.departure}</p>
                  <p><b>To:</b> {booking.destination}</p>
                </span>
                <div>
                  <p><b>Passengers:</b></p>
                  <ol>
                    {booking.passengers.map((passenger, i) => (
                      <li key={i}>
                        {passenger.name}, Age: {passenger.age}
                      </li>
                    ))}
                  </ol>
                </div>
                {booking.bookingStatus === 'confirmed' && <p><b>Seats:</b> {booking.seats}</p>}
                <span>
                  <p><b>Date:</b> {booking.bookingDate.slice(0, 10)} → {booking.journeyDate.slice(0, 10)}</p>
                  <p><b>Time:</b> {booking.journeyTime}</p>
                </span>
                <span>
                  <p><b>Total:</b> ₹{booking.totalPrice}</p>
                </span>
              </div>
              <div className="user-booking-footer">
                {booking.bookingStatus === 'cancelled' ? (
                  <p style={{ color: 'red' }}>Cancelled</p>
                ) : (
                  <p>Confirmed</p>
                )}
                {booking.bookingStatus === 'confirmed' && (
                  <button className="btn btn-danger" onClick={() => cancelTicket(booking._id)}>
                    Cancel Ticket
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBookings;
