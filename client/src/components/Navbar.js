import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { state } = useContext(UserContext);

  const toggleMenu = () => {
    document.getElementById("menu").classList.toggle("hidden");
  };

  const RenderMenu = () => {
    if (state.user) {
      return (
        <Link to="/logout">
          <button className="focus:outline-none lg:text-lg lg:font-bold bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-6 py-2">
            Logout
          </button>
        </Link>
      );
    } else {
      return (
        <Link to="/login">
          <button className="focus:outline-none lg:text-lg font-bold bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-6 py-2">
            Sign In / Sign Up
          </button>
        </Link>
      );
    }
  };

  return (
    <nav className="w-full border-b">
      <div className="py-5 container mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-3">
            <img className="w-16 md:w-24" src={logo} alt="logo" />
            <h1 className="text-xl md:text-2xl font-bold text-indigo-700">
              UrbanNest
            </h1>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-500 focus:outline-none"
        >
          ☰
        </button>

        {/* Menu */}
        <div id="menu" className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-indigo-700">
            Home
          </Link>

          <Link to="/properties" className="text-gray-700 hover:text-indigo-700">
            Properties
          </Link>

          <Link to="/profile" className="text-gray-700 hover:text-indigo-700">
            Profile
          </Link>
        </div>

        {/* Auth Button */}
        <RenderMenu />
      </div>
    </nav>
  );
};

export default Navbar;