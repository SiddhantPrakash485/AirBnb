import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeftLong, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { AuthDatacontext } from "../Context/AuthContext";
import { bookingDataContext } from "../Context/BookingContext";
import { toast } from "react-toastify";

function ViewCard() {
  let [updatePopUp, setUpdatePopUp] = useState(false);
  let [bookingPopUp, setBookingPopUp] = useState(false);
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
  let { deleting, setDeleting } = useContext(listingDataContext);
  let [minDate, setMinDate] = useState("");
  let {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    handleBooking,
    booking,
  } = useContext(bookingDataContext);
  useEffect(() => {
    if (checkIn && checkOut) {
      let inDate = new Date(checkIn);
      let outDate = new Date(checkOut);
      let n = (outDate - inDate) / (24 * 60 * 60 * 1000);
      setNight(n);
      let airBnbCharge = cardDetails.rent * (7 / 100);
      let tax = cardDetails.rent * (7 / 100);

      if (n > 0) {
        setTotal(cardDetails.rent * n + airBnbCharge + tax);
      } else {
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, cardDetails.rent, total]);

  const handleDeleteListing = async () => {
    setDeleting(true);
    try {
      let result = await axios.delete(
        serverUrl + `/api/listing/delete/${cardDetails._id}`,
        {
          withCredentials: true,
        },
      );
      setDeleting(false);
      navigate("/");
      toast.success("Listing Deleted")
      console.log(result.data);
    } catch (error) {
      setDeleting(false);
      console.log(error);
      toast.error(error.response.data.message )
    }
  };

  const hanldeUpdateListing = async () => {
    try {
      setUpdating(true);
      let formData = new FormData();
      formData.append("title", title);
      if (backEndImage1) {
        formData.append("image1", backEndImage1);
      }
      if (backEndImage2) {
        formData.append("image2", backEndImage2);
      }
      if (backEndImage3) {
        formData.append("image3", backEndImage3);
      }
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
      toast.success("Listing Updated")
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
      toast.error(error.response.data.message )
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
  useEffect(() => {
    let today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

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
          <button
            className="px-[30px] py-[10px] text-[18px] bg-[red] text-[white] md:px-[100px] rounded-lg text-nowrap"
            onClick={() => setBookingPopUp((prev) => !prev)}
          >
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
            <div className="w-[100%] flex items-center justify-center gap-[30px] mt-[20px]">
              <button
                className="px-[10px] py-[10px] text-[15px] bg-[red] text-[white] md:px-[100px] md:text-[18px] rounded-lg text-nowrap"
                onClick={hanldeUpdateListing}
                disabled={updating}
              >
                {updating ? "Updating....." : "Update Listing"}
              </button>

              <button
                className="px-[10px] py-[10px] text-[15px] bg-[red] text-[white] md:px-[100px] md:text-[18px] rounded-lg text-nowrap"
                onClick={handleDeleteListing}
                disabled={deleting}
              >
                {deleting ? "Deleting.." : "Delete Listing"}
              </button>
            </div>
          </form>
        </div>
      )}

      {bookingPopUp && (
        <div className="w-[100%] min-h-[100%] flex items-center justify-center flex-col gap-[30px] bg-[#ffffffc4] absolute top-[0px] z-[100] p-[20px] backdrop-blur-sm md:flex-row md:gap-[100px]">
          <RxCross2
            className="w-[30px] h-[30px] bg-[red] cursor-pointer absolute  top-[6%] left-[25px] rounded-[50%] flex items-center justify-center "
            onClick={() => setBookingPopUp(false)}
          />
          <form
            className="max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-start flex-col gap-[10px] border-[1px] border-[#dedddd]"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className=" w-[100%] flex items-center justify-center text-[25px] py-[10px] border-b-[1px] border-[#a3a3a3]">
              Confirm & Book
            </h1>
            <div className="w-[100%] h-[70%]  mt-[10px] rounded-lg p-[10px]">
              <h3 className="text-[19px] font-semibold">Your Trip-</h3>
              <div className="w-[90%] flex items-center justify-start  gap-[24px] mt-[20px] md:items-start  md:justify-center flex-col md:flex-row">
                <label htmlFor="checkIn" className="text-[18px] md:text-[20px]">
                  CheckIn
                </label>
                <input
                  type="date"
                  id="checkIn"
                  min={minDate}
                  className="border-[#555656] border-2 w-[200px] h-[40px] rounded-[10px] bg-transparent px-[10px] text-[15px] md:text-[18px]"
                  required
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                  }}
                  value={checkIn}
                />
              </div>
              <div className="w-[90%] flex items-center justify-start  gap-[10px] mt-[40px] md:items-start  md:justify-center flex-col md:flex-row">
                <label
                  htmlFor="checkOut"
                  className="text-[18px] md:text-[20px]"
                >
                  CheckOut
                </label>
                <input
                  type="date"
                  id="checkOut"
                  min={minDate}
                  className="border-[#555656] border-2 w-[200px] h-[40px] rounded-[10px] bg-transparent px-[10px] text-[15px] md:text-[18px]"
                  required
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                  }}
                  value={checkOut}
                />
              </div>

              <div className="w-[100%] flex items-center justify-center">
                <button
                  className="px-[80px] py-[10px] text-[18px] bg-[red] text-[white] md:px-[100px]  rounded-lg text-nowrap mt-[30px]"
                  onClick={() => handleBooking(cardDetails._id)}
                  disabled={booking}
                >
                  {booking?"Booking...":"BookNow"}
                </button>
              </div>
            </div>
          </form>
          <div className="max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-center flex-col gap-[10px] border-[1px] border-[#e2e1e1]">
            <div className="w-[95%] h-[30%] border-[1px] border-[#dedddd] rounded-lg flex items-center justify-center gap-[8px] p-[20px] overflow-hidden">
              <div className="w-[70px] h-[90px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px] md:h-[100px]">
                <img
                  src={cardDetails.image1}
                  className="w-[100%] h-[100%] rounded-lg"
                />
              </div>
              <div className="w-[80%] h-[100px] gap-[5px]">
                <h1 className="w-[90%] truncate">{`In ${cardDetails.landmark.toUpperCase()},${cardDetails.city.toUpperCase()}`}</h1>
                <h1>{`${cardDetails.title.toUpperCase()}`}</h1>
                <h1>{`${cardDetails.category.toUpperCase()}`}</h1>
                <h1 className="flex items-center justify-start gap-[5px]">
                  <FaStar className="text-[#eb6262]" />
                  {`${cardDetails.ratings}`}
                </h1>
              </div>
            </div>
            <div className="w-[95%] h-[60%] border-[1px] border-[#dedddd] rounded-lg flex justify-start items-start p-[20px] gap-[15px] flex-col">
              <h1 className="text-[22px] font-semibold">Booking Price -</h1>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">
                  {`Rs.${cardDetails.rent} X ${night} nights`}
                </span>
                <span>{`Rs.${cardDetails.rent * night}`}</span>
              </p>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">Tax</span>
                <span>{`Rs.${(cardDetails.rent * 7) / 100}`}</span>
              </p>
              <p className="w-[100%] flex justify-between items-center px-[20px] border-b-[1px] border-gray-500 pb-[10px]">
                <span className="font-semibold">Airbnb Charge</span>
                <span>{`Rs.${(cardDetails.rent * 7) / 100}`}</span>
              </p>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">Total Price</span>
                <span>Rs.{total}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCard;
