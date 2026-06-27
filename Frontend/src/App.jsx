import { useContext, useState } from "react";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import ListingPage1 from "./pages/ListingPage1.jsx";
import ListingPage2 from "./pages/ListingPage2.jsx";
import ListingPage3 from "./pages/ListingPage3.jsx";
import { userDataContext } from "./Context/UserContext";
import MyListing from "./pages/MyListing.jsx";
import ViewCard from "./pages/ViewCard.jsx";

function App() {
  let { userData } = useContext(userDataContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/listingpage1"
          element={userData != null ? <ListingPage1 /> : <Navigate to={"/"} />}
        />
        <Route
          path="/listingpage2"
          element={userData != null ? <ListingPage2 /> : <Navigate to={"/"} />}
        />
        <Route
          path="/listingpage3"
          element={userData != null ? <ListingPage3 /> : <Navigate to={"/"} />}
        />
        <Route
          path="/mylisting"
          element={userData != null ? <MyListing /> : <Navigate to={"/"} />}
        />
        <Route
          path="/viewcard"
          element={userData != null ? <ViewCard /> : <Navigate to={"/"} />}
        />
      </Routes>
    </>
  );
}

export default App;
