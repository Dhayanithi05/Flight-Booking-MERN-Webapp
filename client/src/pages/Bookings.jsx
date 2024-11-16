import React, { useEffect, useState } from 'react';
import '../styles/Bookings.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Bookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeats } = location.state || {}; // Destructure selectedSeats from the location state

  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-bookings');
      setBookings(response.data.reverse());
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const cancelTicket = async (id) => {
    try {
      await axios.put(`http://localhost:6001/cancel-ticket/${id}`);
      alert('Ticket cancelled!');
      fetchBookings(); // Refresh bookings after cancellation
    } catch (error) {
      console.error('Error cancelling ticket:', error);
    }
  };

  const userBookings = bookings.filter((booking) => booking.user === userId);

  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>
      <div className="bookings-container">
        {userBookings.map((booking) => (
          <div className="ticket" key={booking._id}>
            <div className="ticket-left">
              <div className="qr-code">
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
                    <h2>{booking.departure?.slice(0, 3).toUpperCase() || 'N/A'}</h2>
                    <p>{booking.departure}</p>
                  </div>
                  <div className="flight-info">
                    <span className="flight-number">RS {booking.flightId}</span>
                    <div className="flight-time">
                      <span className="duration">{booking.journeyTime}</span>
                    </div>
                  </div>
                  <div className="arrival">
                    <h2>{booking.destination?.slice(0, 3).toUpperCase() || 'N/A'}</h2>
                    <p>{booking.destination}</p>
                  </div>
                </div>
              </div>

              <div className="ticket-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <label>Date</label>
                    <p>{booking.journeyDate?.slice(0, 10) || 'N/A'}</p>
                  </div>
                  <div className="detail-item">
                    <label>Departure</label>
                    <p>Time: {booking.journeyTime}</p>
                  </div>
                  <div className="detail-item">
                    <label>Gate/Seat</label>
                    <p>{booking.seats}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <label>Passenger</label>
                    <p>{booking.passengers?.[0]?.name || 'N/A'}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
