import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
const Login = () => {
  const { dispatch } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  

  const loginUser = async (e) => {
    if (e) e.preventDefault();

    console.log("LOGIN FUNCTION RUNNING");

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const data = response.data;

      console.log("SUCCESS:", data);
      const normalizedType = data.userLogin.userType.toLowerCase();

      // ✅ store data
      localStorage.setItem("jwtoken", data.token);
      localStorage.setItem("user", JSON.stringify(data.userLogin));
      localStorage.setItem("userId", data.userLogin._id);
      localStorage.setItem("userType", normalizedType);
      localStorage.setItem("userEmail", data.userLogin.email);
      

      // ✅ update state
      dispatch({ type: "USER", payload: data.userLogin });
      dispatch({ type: "USER_TYPE", payload: normalizedType });

      toast.success("Login Successful");

      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        setAuthStatus(error.response.data.error);
      } else {
        setAuthStatus("Server error");
      }

      console.log("ERROR:", error.response || error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 shadow-lg rounded-lg w-80">
            <h2 className="text-2xl mb-4 font-bold">Sign In</h2>

            <input
              type="email"
              placeholder="Email"
              className="border p-2 mb-3 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-2 mb-3 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {authStatus && (
              <p className="text-red-500 text-sm mb-2">{authStatus}</p>
            )}

            <button
              type="button"
              onClick={(e) => {
                console.log("BUTTON CLICKED");
                loginUser(e); // 🔥 THIS WAS MISSING
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
            >
              Login
            </button>

            <p className="mt-4 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Signup
              </Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
