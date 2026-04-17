import React from "react";
import PropertyCard from "./PropertyCard";

const Home = () => {
  const properties = [
    { name: "Luxury Villa", location: "Delhi", price: 2500000 },
    { name: "Modern Flat", location: "Mumbai", price: 1500000 },
    { name: "Cozy Apartment", location: "Bangalore", price: 1200000 },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px",fontSize: "32px",fontWeight: "bold"}}>
        Discover Your Dream Property
    </h1>
    <h2 style={{
  textAlign: "center",
  marginBottom: "20px",
  color: "#4f46e5"
}}>
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
          <PropertyCard key={i} property={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;