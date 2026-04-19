import React from "react";
import PropertyCard from "./PropertyCard";
import Hero from "./hero";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/halls`,
        );

        console.log("FULL RESPONSE:", res);
        console.log("DATA:", res.data);
        setProperties(res.data.halls);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Hero />
      <div style={{ padding: "40px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Discover Your Dream Property
        </h1>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#4f46e5",
          }}
        >
          Featured Properties
        </h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {properties.map((p, i) => (
            <PropertyCard
              key={i}
              property={{
                name: p.name,
                location: p.location,
                price: p.capacity * 1000,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
