import React from "react";

const PropertyCard = ({ property }) => {
  return (
    <div style={{
      border: "1px solid #eee",
      borderRadius: "12px",
      padding: "10px",
      width: "260px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <img
        src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
        alt="property"
        style={{ width: "100%", borderRadius: "10px" }}
      />

      <h3 style={{ marginTop: "10px" }}>{property.name}</h3>

      <p style={{ color: "gray" }}>{property.location}</p>

      <p style={{ fontWeight: "bold" }}>₹ {property.price}</p>

      <button
        style={{
          marginTop: "10px",
          width: "100%",
          background: "#4f46e5",
          color: "white",
          padding: "8px",
          border: "none",
          borderRadius: "6px"
        }}
        onClick={() => alert("Inquiry Sent!")}
      >
        View / Buy
      </button>
    </div>
  );
};

export default PropertyCard;