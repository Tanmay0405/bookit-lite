import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/halls/${id}`
        );
        setProperty(res.data.hall);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{property.name}</h1>
      <p>📍 {property.location}</p>
      <p>👥 Capacity: {property.capacity}</p>
      <p>{property.description}</p>
    </div>
  );
};

export default PropertyDetails;