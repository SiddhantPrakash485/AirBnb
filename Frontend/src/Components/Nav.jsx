import React, { useContext } from "react";
import { useState } from "react";
import AirBNBlogo from "../assets/AirBNBlogo.jpeg";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { MdPool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin } from "react-icons/gi";
import { GiShop } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthDatacontext } from "../Context/AuthContext.jsx";
import { userDataContext } from "../Context/UserContext.jsx";
import { listingDataContext } from "../Context/ListingContext.jsx";

function Nav() {
  let [showpopup, setShowpopup] = useState(false);
  let navigate = useNavigate();
  let { userData, setUserData } = useContext(userDataContext);
  let [cate, setCate] = useState();
  let { listingData, setListingData, setNewListData, newListData } =
    useContext(listingDataContext);
  let { serverUrl } = useContext(AuthDatacontext);
  const handlelogout = async () => {
    try {
      let result = await axios.post(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      setUserData(null);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (category) => {
    setCate(category);
    if (category == "trending") {
      setNewListData(listingData);
    } else {
      setNewListData(listingData.filter((list) => list.category == category));
    }
  };
  return (
    <div className="fixed top-0 bg-[white]">
      <div className="w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[20px] flex items-center justify-between md:px-[40px]">
        <div>
          <img src={AirBNBlogo} className="w-[130px]" />
        </div>

        <div className="w-[35%] relative hidden md:block">
          <input
            type="text"
            className="w-[100%] py-[10px] px-[30px] border-[2px] border-[#bdbaba] cutline-none rounded-[30px] overflow-auto text-[17px]"
            placeholder="Any Where | Any Location | Any City"
          />
          <button className="absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[8px]">
            <FiSearch className="w-[20px] h-[20px] text-[white]" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-[10px] relative ">
          <span
            className="text-[18px] cursor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block"
            onClick={() => navigate("/listingpage1")}
          >
            List Your Home
          </span>
          <button
            className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c] rounded-[50px] hover:shadow-lg"
            onClick={() => setShowpopup((prev) => !prev)}
          >
            <span>
              <GiHamburgerMenu className="h-[20px] w-[20px]" />
            </span>
            {userData == null && (
              <span>
                <CgProfile className="h-[23px] w-[23px]" />
              </span>
            )}
            {userData != null && (
              <span className="w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex justify-center items-center">
                {userData?.name.slice(0, 1)}
              </span>
            )}
          </button>
          {showpopup && (
            <div className="w-[220px] h-[250px] absolute bg-[white] border-[1px] rounded-lg top-[110%] right-[3%] border-[#aaa9a9] z-10 md:right-[10%]">
              <ul className="w-[100%] h-[100%] text-[17px] flex items-start justify-around py-[10px] flex-col">
                {!userData && (
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      navigate("/login");
                      setShowpopup(false);
                    }}
                  >
                    Login
                  </li>
                )}
                {userData && (
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      handlelogout();
                      setShowpopup(false);
                    }}
                  >
                    Logout
                  </li>
                )}
                <div className="w-[100%] h-[1px] bg-[#c1c0c0]"></div>
                <li
                  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/listingpage1");
                    setShowpopup(false);
                  }}
                >
                  List your Home
                </li>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                onClick={() => {
                    navigate("/mylisting");
                    setShowpopup(false);
                  }}>
                  My Listings
                </li>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer">
                  Check Bookings
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="w-[100%] h-[60px] flex items-center justify-center md:hidden">
        <div className="w-[80%] relative ">
          <input
            type="text"
            className="w-[100%] py-[10px] px-[30px] border-[2px] border-[#bdbaba] cutline-none rounded-[30px] overflow-auto text-[17px]"
            placeholder="Any Where | Any Location | Any City"
          />
          <button className="absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[8px]">
            <FiSearch className="w-[20px] h-[20px] text-[white]" />
          </button>
        </div>
      </div>

      <div className="w-[100vw] h-[85px] bg-white flex items-center justify-start cursor-pointer gap-[40px] overflow-auto md:justify-center px-[15px]">
        <div
          className="flex items-center justify-center flex-col hover:border-b border-[#a6a5a5] text-[13px]"
          onClick={() => {
            handleCategory("trending");
            setCate("");
          }}
        >
          <MdWhatshot className="w-[30px] h-[30px] text-black" />
          <h3>Trending</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b border-[#a6a5a5] text-[13px] ${cate == "villa" ? "border-b-[1px]" : ""}`}
          onClick={() => handleCategory("villa")}
        >
          <GiFamilyHouse className="w-[30px] h-[30px] text-black" />
          <h3>Villa</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b border-[#a6a5a5] text-[13px] ${cate == "farmHouse" ? "border-b-[1px]" : ""}`}
          onClick={() => handleCategory("farmHouse")}
        >
          <FaTreeCity className="w-[30px] h-[30px] text-black " />
          <h3>Farm House</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b border-[#a6a5a5] text-[13px] ${cate == "poolHouse" ? "border-b-[1px]" : ""}`}
          onClick={() => handleCategory("poolHouse")}>
          <MdPool className="w-[30px] h-[30px] text-black" />
          <h3>Pool House</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b border-[#a6a5a5] text-[13px] ${cate == "rooms" ? "border-b-[1px]" : ""}`}
          onClick={() => handleCategory("rooms")}>
          <MdBedroomParent className="w-[30px] h-[30px] text-black" />
          <h3>Rooms</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b border-[#a6a5a5] text-[13px] ${cate == "flat" ? "border-b-[1px]" : ""}`}
          onClick={() => handleCategory("flat")}>
          <BiBuildingHouse className="w-[30px] h-[30px] text-black" />
          <h3>Flat</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b border-[#a6a5a5] text-[13px] ${cate == "pg" ? "border-b-[1px]" : ""}`}
          onClick={() => handleCategory("pg")}>
          <IoBedOutline className="w-[30px] h-[30px] text-black" />
          <h3>PG</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b border-[#a6a5a5] text-[13px] ${cate == "cabin" ? "border-b-[1px]" : ""}`}
          onClick={() => handleCategory("cabin")}>
          <GiWoodCabin className="w-[30px] h-[30px] text-black" />
          <h3>Cabin</h3>
        </div>

        <div className={`flex items-center justify-center flex-col hover:border-b border-[#a6a5a5] text-[13px] ${cate == "shops" ? "border-b-[1px]" : ""}`}
          onClick={() => handleCategory("shops")}>
          <GiShop className="w-[30px] h-[30px] text-black" />
          <h3>Shops</h3>
        </div>
      </div>
    </div>
  );
}

export default Nav;
