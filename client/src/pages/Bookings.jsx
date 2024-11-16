import React, { useEffect, useState } from 'react'
import '../styles/Bookings.css'
import axios from 'axios';
// Bookings.jsx (User's bookings)
  const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchBookings();
  }, [])

  const fetchBookings = async () => {
    await axios.get('http://localhost:6001/fetch-bookings').then(
      (response) => {
        setBookings(response.data.reverse());
      }
    )
  }

  const cancelTicket = async (id) => {
    await axios.put(`http://localhost:6001/cancel-ticket/${id}`).then(
      (response) => {
        alert("Ticket cancelled!");
        fetchBookings();
      }
    )
  }

  const userBookings = bookings.filter(booking => booking.user === userId);

  return (
    <div className="user-bookingsPage">
      <h1>Your Bookings</h1>

      <div className="user-bookings">
        {userBookings.map((booking) => (
          <div className="user-booking" key={booking._id}>
            <p><b>Booking ID:</b> {booking._id}</p>
            
            {/* Contact Info */}
            <span>
              <p><b>Mobile:</b> {booking.mobile}</p>
              <p><b>Email:</b> {booking.email}</p>
            </span>

            {/* Flight Info */}
            <span>
              <p><b>Flight Id:</b> {booking.flightId}</p>
              <p><b>Flight name:</b> {booking.flightName}</p>
            </span>

            {/* Route Info */}
            <span>
              <p><b>On-boarding:</b> {booking.departure}</p>
              <p><b>Destination:</b> {booking.destination}</p>
            </span>

            {/* Passenger Info */}
            <span>
              <div>
                <p><b>Passengers:</b></p>
                <ol>
                  {booking.passengers.map((passenger, i) => (
                    <li key={i}>
                      <p><b>Name:</b> {passenger.name}, <b>Age:</b> {passenger.age}</p>
                    </li>
                  ))}
                </ol>
              </div>
              {booking.bookingStatus === 'confirmed' && 
                <p><b>Seats:</b> {booking.seats}</p>
              }
            </span>

            {/* Date Info */}
            <span>
              <p><b>Booking date:</b> {booking.bookingDate.slice(0,10)}</p>
              <p><b>Journey date:</b> {booking.journeyDate.slice(0,10)}</p>
            </span>

            {/* Time and Price */}
            <span>
              <p><b>Journey Time:</b> {booking.journeyTime}</p>
              <p><b>Total price:</b> ₹{booking.totalPrice}</p>
            </span>

            {/* Status */}
            <div className={`status-badge ${
              booking.bookingStatus === 'cancelled' ? 'status-cancelled' : 'status-confirmed'
            }`}>
              {booking.bookingStatus}
            </div>

            {booking.bookingStatus === 'confirmed' && (
              <button onClick={() => cancelTicket(booking._id)}>
                Cancel Ticket
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bookings