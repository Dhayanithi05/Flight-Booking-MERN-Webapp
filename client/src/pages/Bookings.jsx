import React, { useEffect, useState } from 'react';
import '../styles/Bookings.css';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');

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
        alert("Ticket cancelled!!");
        fetchBookings();
      }
    );
  };

  return (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
