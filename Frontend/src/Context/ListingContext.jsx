import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthDatacontext } from "./AuthContext";
import axios from "axios";

export const listingDataContext = createContext();

function ListingContext({ children }) {
  let [title, SetTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, SetRent] = useState("");
  let [city, SetCity] = useState("");
  let [landmark, SetLandmark] = useState("");
  let [category, setCategory] = useState("");

  let{serverUrl}=useContext(AuthDatacontext)

  const handleAddListing = async () => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

      let result=await axios.post(serverurl+"/api/listing/add",formData,{withCredentials:true})
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  };

  let value = {
    title, SetTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, SetRent,
    city, SetCity,
    landmark, SetLandmark,
    category, setCategory,
    handleAddListing
  };
  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  );
}

export default ListingContext;
