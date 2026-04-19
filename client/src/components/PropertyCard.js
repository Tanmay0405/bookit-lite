import React from "react";

const PropertyCard = ({ property }) => {
  return (
    <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      
      {/* Image */}
      <img
        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
        alt="property"
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">

        <h2 className="text-lg font-bold text-gray-800">
          {property.name}
        </h2>

        <p className="text-gray-500 text-sm">
          📍 {property.location}
        </p>

        <p className="text-indigo-600 font-bold mt-2 text-lg">
          ₹ {property.price.toLocaleString()}
        </p>

        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <span>🛏 3 BHK</span>
          <span>🛁 2 Bath</span>
          <span>📐 1200 sqft</span>
        </div>

        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          View Details
        </button>

      </div>
    </div>
  );
};

export default PropertyCard;