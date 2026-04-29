import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createContext, useReducer, useEffect } from "react";

// importing components
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import Login from "./components/auth/Login";
import PropertyDetails from "./components/PropertyDetails";
import ErrorPage from "./components/ErrorPage";
import Halls from "./components/halls/Halls";
import BookingForm from "./components/bookings/BookingForm";
import BookingsAdmin from "./components/bookings/BookingsAdmin";
import BookingFaculty from "./components/bookings/BookingsFaculty";
import Footer from "./components/Footer";
import HallsAdmin from "./components/halls/HallsAdmin";
import SellerDashboard from "./components/dashboard/SellerDashboard";
import BuyerDashboard from "./components/dashboard/BuyerDashboard";
import { initialState, reducer } from "./reducer/UseReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HallsEdit from "./components/halls/HallsEdit";
import HallForm from "./components/halls/HallForm";
import PasswordReset from "./components/auth/PasswordReset";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifySuccess from "./components/auth/VerifySuccess";
import Unauthorized from "./components/Unauthorized";
import BookingUpdateFrom from "./components/bookings/BookingUpdateForm";
import Events from "./components/bookings/Events";
import BookingsView from "./components/bookings/BookingView";
import { CalendarView } from "./components/CalendarView";

export const UserContext = createContext();

const App = () => {
  // ✅ INTERCEPTOR (runs once)
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((req) => {
      const token = localStorage.getItem("jwtoken");

      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      } else {
        delete req.headers.Authorization;
      }

      return req;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("USER TYPE:", state.userType);
  console.log("APP STATE:", state);

  useEffect(() => {
    const type = localStorage.getItem("userType");
    const user = localStorage.getItem("user");

    if (type) {
      dispatch({ type: "USER_TYPE", payload: type });
    }

    if (user) {
      dispatch({ type: "USER", payload: JSON.parse(user) });
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<div style={{ padding: "40px" }}>Profile Page</div>}
          />
          <Route path="/properties" element={<Home />} />
          <Route path="/calendar" element={<CalendarView />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/dashboard"
            element={
              state.userType === "seller" ? (
                <SellerDashboard />
              ) : state.userType === "buyer" ? (
                <BuyerDashboard />
              ) : (
                <Unauthorized />
              )
            }
          />
          <Route path="/passwordReset" element={<PasswordReset />} />
          <Route
            path="/forgotPassword/:id/:token"
            element={<ForgotPassword />}
          />
          <Route path="/verifyEmail/:id/:token" element={<VerifySuccess />} />

          <Route path="/events" element={<Events />} />
          <Route path="/property/:id" element={<PropertyDetails />} />

          <Route
            path="/halls"
            element={state.userType === "seller" ? <HallsAdmin /> : <Halls />}
          />

          <Route
            path="/halls/:hallId/:hallName"
            element={
              state.userType === "seller" ? <HallsEdit /> : <Unauthorized />
            }
          />

          <Route
            path="/hallForm"
            element={
              state.userType === "seller" ? <HallForm /> : <Unauthorized />
            }
          />

          <Route
            path="/bookings"
            element={
              state.userType === "seller" ? (
                <BookingsAdmin />
              ) : state.userType === "buyer" ? (
                <BookingFaculty />
              ) : (
                <Unauthorized />
              )
            }
          />
          <Route
            path="/bookingsEdit/:bookingId"
            element={
              state.userType === "seller" ? (
                <BookingUpdateFrom />
              ) : process.env.REACT_APP_HOD_FEATURE &&
                state.userType === "buyer" ? (
                <BookingUpdateFrom />
              ) : (
                <Unauthorized />
              )
            }
          />

          <Route
            path="/bookingForm/:hallId/:hallName"
            element={<BookingForm />}
          />
          <Route path="/bookingsView/:bookingId" element={<BookingsView />} />

          <Route path="/*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </UserContext.Provider>

      <ToastContainer position="bottom-left" autoClose={3000} theme="light" />
    </>
  );
};

export default App;
