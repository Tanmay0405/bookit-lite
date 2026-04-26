import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerDashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/halls");
        
        // Filter only seller's properties
        const userEmail = localStorage.getItem("userEmail");
        const myProps = res.data.halls.filter(
          (p) => p.hallCreater === userEmail
        );

        setProperties(myProps);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMyProperties();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Properties</h1>

      {properties.length === 0 ? (
        <p>No properties listed yet</p>
      ) : (
        properties.map((p) => (
          <div key={p._id} style={{ marginBottom: "20px" }}>
            <h3>{p.name}</h3>
            <p>{p.location}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerDashboard;