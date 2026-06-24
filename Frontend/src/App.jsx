import { useState } from "react";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Listingpage1 from "./pages/Listingpage1";
import ListingPage2 from "./pages/ListingPage2";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listingpage1" element={<Listingpage1 />} />
        <Route path="/listingpage2" element={<ListingPage2 />} />
      </Routes>
    </>
  );
}

export default App;
