import React from "react";

const Hero = () => {
  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Your Dream Home, <br />Buy • Rent • Invest
        </h1>

        <button className="bg-yellow-500 px-6 py-3 rounded text-black font-semibold hover:bg-yellow-400 transition">
          Explore Now
        </button>

        {/* Search Bar */}
        <div className="mt-10 bg-white text-black p-4 rounded flex flex-wrap gap-3 justify-center">
          
          <input type="date" className="border p-2 rounded" />
          <input type="date" className="border p-2 rounded" />
          
          <select className="border p-2 rounded">
            <option>1 Guest</option>
            <option>2 Guests</option>
          </select>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Check
          </button>

        </div>

      </div>
    </div>
  );
};

export default Hero;