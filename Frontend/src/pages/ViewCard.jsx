import React, { useContext, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { AuthDatacontext } from "../Context/AuthContext";

function ViewCard() {
  let [updatePopUp, setUpdatePopUp] = useState(false);
  let navigate = useNavigate();
  let { cardDetails } = useContext(listingDataContext);
  let { userData } = useContext(userDataContext);
  let [title, setTitle] = useState(cardDetails.title);
  let [description, setDescription] = useState(cardDetails.description);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState(cardDetails.rent);
  let [city, setCity] = useState(cardDetails.city);
  let [landmark, setLandmark] = useState(cardDetails.landmark);
  let { serverUrl } = useContext(AuthDatacontext);
  let { updating, setUpdating } = useContext(listingDataContext);

  const hanldeUpdateListing = async () => {
    try {
      setUpdating(true);
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);

      let result = await axios.post(
        serverUrl + `/api/listing/update/${cardDetails._id}`,
        formData,
        {
          withCredentials: true,
        },
      );
      setUpdating(false);
      console.log(result);

      navigate("/");
      setTitle("");
      setDescription("");
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setLandmark("");
      setCity("");
    } catch (error) {
      setUpdating(false);
      console.log(error);
    }
  };
  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file);
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file);
  };

  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col relative overflow-auto ">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute  top-[5%] left-[20px] rounded-[50%] flex items-center justify-center "
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
      </div>
      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]">
          {`In ${cardDetails.landmark.toUpperCase()} ,${cardDetails.city.toUpperCase()}`}
        </h1>
      </div>
      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-centeer justify-center border-[2px] border-[white] ">
          <img src={cardDetails.image1} alt="" className="w-[100%]" />
        </div>
        <div className="w-[100%] h-[30%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white] ">
            {" "}
            <img src={cardDetails.image2} alt="" className="w-[100%]" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white] ">
            <img src={cardDetails.image3} alt="" className="w-[100%]" />
          </div>
        </div>
      </div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`${cardDetails.title.toUpperCase()},${cardDetails.category.toUpperCase()},${cardDetails.landmark.toUpperCase()}`}</div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800">{`${cardDetails.description.toUpperCase()}`}</div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`Rs.${cardDetails.rent}/day`}</div>
      <div className="w-[95%] h-[50px] flex items-center justify-start px-[110px]">
        {cardDetails.host == userData._id && (
          <button
            className="px-[30px] py-[10px] text-[18px] bg-[red] text-[white] md:px-[100px] rounded-lg text-nowrap"
            onClick={() => setUpdatePopUp((prev) => !prev)}
          >
            Edit Listing
          </button>
        )}
        {cardDetails.host != userData._id && (
          <button className="px-[30px] py-[10px] text-[18px] bg-[red] text-[white] md:px-[100px] rounded-lg text-nowrap">
            Book
          </button>
        )}
      </div>

      {/*update Listing Page */}

      {updatePopUp && (
        <div className="w-[100%] h-[100%] flex items-center justify-center bg-[#000000c6] absolute top-[0px] z-[100] backdrop-blur-sm">
          <RxCross2
            className="w-[30px] h-[30px] bg-[red] cursor-pointer absolute  top-[6%] left-[25px] rounded-[50%] flex items-center justify-center "
            onClick={() => setUpdatePopUp(false)}
          />

          <form
            action=""
            className="max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col  gap-[10px] overflow-auto mt-[50px] text-[white] bg-[#272727] p-[20px] rounded-lg"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
              Update your Details
            </div>
            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="Title" className="text-[20px] ">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="_bhk house or best title"
              />
            </div>
            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="des" className="text-[20px] ">
                Description
              </label>
              <textarea
                name=""
                id="des"
                className="w-[90%] h-[80px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="image1" className="text-[20px] ">
                Image1
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                <input
                  type="file"
                  id="Image1"
                  className="w-[90%] text-[15px] px-[10px]"
                  required
                  onChange={handleImage1}
                />
              </div>
            </div>
            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="image2" className="text-[20px] ">
                Image2
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                <input
                  type="file"
                  id="Image2"
                  className="w-[90%] text-[15px] px-[10px]"
                  required
                  onChange={handleImage2}
                />
              </div>
            </div>
            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
              <label htmlFor="image3" className="text-[20px] ">
                Image3
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                <input
                  type="file"
                  id="Image3"
                  className="w-[90%] text-[15px] px-[10px]"
                  required
                  onChange={handleImage3}
                />
              </div>
            </div>
            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="rent" className="text-[20px] ">
                Rent
              </label>
              <input
                type="number"
                id="rent"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                required
                onChange={(e) => setRent(e.target.value)}
                value={rent}
                placeholder="Rs.______/day"
              />
            </div>
            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="city" className="text-[20px] ">
                City
              </label>
              <input
                type="text"
                id="city"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                required
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder="City,Country"
              />
            </div>
            <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
              <label htmlFor="landmark" className="text-[20px] ">
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]"
                required
                onChange={(e) => setLandmark(e.target.value)}
                value={landmark}
              />
            </div>
            <button
              className="px-[50px] py-[10px] text-[18px] bg-[red] text-[white] md:px-[100px] rounded-lg"
              onClick={hanldeUpdateListing} disabled={updating}
            >
              {updating?"Updating.....":"Update Listing"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ViewCard;
