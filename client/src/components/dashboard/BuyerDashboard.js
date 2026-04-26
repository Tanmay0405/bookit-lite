import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyerDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/bookings");

        setBookings(res.data.bookings);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id}>
            <h3>{b.hallName}</h3>
            <p>Date: {b.date}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BuyerDashboard;