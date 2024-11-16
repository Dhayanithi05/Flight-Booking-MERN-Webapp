import React, { useEffect, useState } from 'react';
import '../styles/Bookings.css';
import axios from 'axios';
<<<<<<< HEAD
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation to access state

const Bookings = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const location = useLocation(); // Use this to get passed state from the previous page
  console.log('Location State:', location.state);
  const { selectedSeats } = location.state || {}; // Destructure selectedSeats from the location state
=======
=======
<<<<<<< HEAD
// Bookings.jsx (User's bookings)
  const Bookings = () => {
=======

const Bookings = () => {
>>>>>>> origin/main
>>>>>>> origin/main
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');

<<<<<<< HEAD
  // Fetch bookings on component mount
  const fetchBookings = async () => {
    const response = await axios.get('http://localhost:6001/fetch-bookings');
    setBookings(response.data.reverse());
  };

  useEffect(() => {
    fetchBookings();
  }, []);
=======
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    await axios.get('http://localhost:6001/fetch-bookings').then(
      (response) => {
        setBookings(response.data.reverse());
      }
<<<<<<< HEAD
    )
  }
=======
    );
  };
>>>>>>> origin/main

  const cancelTicket = async (id) => {
    await axios.put(`http://localhost:6001/cancel-ticket/${id}`).then(
      (response) => {
<<<<<<< HEAD
        alert("Ticket cancelled!");
=======
        alert("Ticket cancelled!!");
<<<<<<< HEAD
        fetchBookings(); // Refresh bookings after cancellation
=======
>>>>>>> origin/main
        fetchBookings();
>>>>>>> origin/main
      }
    );
  };

  const userBookings = bookings.filter(booking => booking.user === userId);

  return (
<<<<<<< HEAD
    <div className="user-bookingsPage">
<<<<<<< HEAD
      <h1>Bookings</h1>

      <div className="user-bookings">
        {bookings.filter(booking => booking.user === userId).map((booking) => {
          return (
            <div className="user-booking" key={booking._id}>
              <p><b>Booking ID:</b> {booking._id}</p>
              <span>
                <p><b>Mobile:</b> {booking.mobile}</p>
                <p><b>Email:</b> {booking.email}</p>
              </span>
              <span>
                <p><b>Flight Id:</b> {booking.flightId}</p>
                <p><b>Flight name:</b> {booking.flightName}</p>
              </span>
              <span>
                <p><b>On-boarding:</b> {booking.departure}</p>
                <p><b>Destination:</b> {booking.destination}</p>
              </span>
              <span>
                <div>
                  <p><b>Passengers:</b></p>
                  <ol>
                    {booking.passengers.map((passenger, i) => {
                      return (
                        <li key={i}><p><b>Name:</b> {passenger.name}, <b>Age:</b> {passenger.age}</p></li>
                      );
                    })}
                  </ol>
                </div>
                {/* Display selected seats from the state */}
              {selectedSeats && selectedSeats.length > 0 && (
                <div>
                  <p><b>Selected Seats:</b> {selectedSeats.join(', ')}</p>
                </div>
              )}
               
              </span>
              <span>
                <p><b>Booking date:</b> {booking.bookingDate.slice(0, 10)}</p>
                <p><b>Journey date:</b> {booking.journeyDate.slice(0, 10)}</p>
              </span>
              <span>
                <p><b>Journey Time:</b> {booking.journeyTime}</p>
                <p><b>Total price:</b> {booking.totalPrice}</p>
              </span>
              {booking.bookingStatus === 'cancelled' ?
                <p style={{ color: "red" }}><b>Booking status:</b> {booking.bookingStatus}</p>
                :
                <p><b>Booking status:</b> {booking.bookingStatus}</p>
              }

              

              {booking.bookingStatus === 'confirmed' ?
                <div>
                  <button className="btn btn-danger" onClick={() => cancelTicket(booking._id)}>Cancel Ticket</button>
                </div>
                : <></>
              }
            </div>
          );
        })}
=======
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
>>>>>>> origin/main
=======
    <div className="bookings-page">
      <h1>My Bookings</h1>
      <div className="bookings-container">
        {bookings.filter(booking => booking.user === userId).map((booking) => (
          <div className="ticket" key={booking._id}>
            <div class="ticket-left">
              <div class="qr-code">
                <img src={require('../assets/QR.png')} alt="QR Code" />
              </div>
            </div>
            <div className="ticket-divider">
              <div className="divider-line"></div>
              <div className="divider-circles">
                <div className="circle-top"></div>
                <div className="circle-bottom"></div>
              </div>
            </div>
            <div className="ticket-right">
              <div className="ticket-header">
                <div className="flight-route">
                  <div className="departure">
                    <h2>{booking.departure ? booking.departure.slice(0, 3).toUpperCase() : 'N/A'}</h2>
                    <p>{booking.departure}</p>
                  </div>
                  <div className="flight-info">
                    <span className="flight-number">RS {booking.flightId}</span>
                    <div className="flight-time">
                      <span className="duration">{booking.journeyTime}</span>
                    </div>
                  </div>
                  <div className="arrival">
                    <h2>{booking.destination ? booking.destination.slice(0, 3).toUpperCase() : 'N/A'}</h2>
                    <p>{booking.destination}</p>
                  </div>
                </div>
              </div>

              <div className="ticket-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <label>Date</label>
                    <p>{booking.journeyDate ? booking.journeyDate.toString().slice(0, 10) : 'N/A'}</p>
                  </div>
                  <div className="detail-item">
                    <label>Departure</label>
                    <p>Time : {booking.journeyTime}</p>
                  </div>
                  <div className="detail-item">
                    <label>Gate/Seat</label>
                    <p>{booking.seats}</p>
                  </div>
                </div>

                {/* Ensure passengers exist and have data before accessing their properties */}
                <div className="detail-row">
                  <div className="detail-item">
                    <label>Passenger</label>
                    <p>{booking.passengers && booking.passengers[0] ? booking.passengers[0].name : 'N/A'}</p>
                  </div>
                </div>
              </div>

              {booking.bookingStatus === 'confirmed' && (
                <button
                  className="cancel-button"
                  onClick={() => cancelTicket(booking._id)}
                >
                  Cancel Ticket
                </button>
              )}

              <div className={`booking-status ${booking.bookingStatus}`}>
                {booking.bookingStatus}
              </div>
            </div>
>>>>>>> origin/main
          </div>
        ))}
>>>>>>> origin/main
      </div>
    </div>
  );
};

export default Bookings;
