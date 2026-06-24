import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GiFamilyHouse } from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { MdPool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin } from "react-icons/gi";
import { GiShop } from "react-icons/gi";

function ListingPage2() {
  let navigate = useNavigate();
  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto ">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute  top-[5%] left-[20px] rounded-[50%] flex items-center justify-center "
        onClick={() => navigate("/listingpage1")}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
      </div>
      <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
        Set your Category
      </div>
      <div className="max-w-[900px] w-[100%] h-[550px] overflow-auto bg-white flex items-center justify-start flex-col gap-[40px] mt-[30px]">
        <h1 className="text-[18px] text-[black] md:text-[30px]">
          Which of these best describes your place?
        </h1>
        <div className="max-w-[900px] w-[100%] h-[100%] flex flex-wrap items-center justify-center   gap-[15px] md:w-[70%]">
          <div className="w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg">
            <GiFamilyHouse className="w-[30px] h-[30px] text-black" />
            <h3>Villa</h3>
          </div>
          <div className="w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg">
            <FaTreeCity className="w-[30px] h-[30px] text-black " />
            <h3>Farm House</h3>
          </div>
          <div className="w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg">
            <MdPool className="w-[30px] h-[30px] text-black" />
            <h3>Pool House</h3>
          </div>
          <div className="w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg">
            <MdBedroomParent className="w-[30px] h-[30px] text-black" />
            <h3>Rooms</h3>
          </div>
          <div className="w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg">
            <BiBuildingHouse className="w-[30px] h-[30px] text-black" />
            <h3>Flat</h3>
          </div>
          <div className="w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg">
            <IoBedOutline className="w-[30px] h-[30px] text-black" />
            <h3>PG</h3>
          </div>
          <div className="w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg">
            <GiWoodCabin className="w-[30px] h-[30px] text-black" />
            <h3>Cabin</h3>
          </div>
          <div className="w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg">
            <GiShop className="w-[30px] h-[30px] text-black" />
            <h3>Shops</h3>
          </div>
        </div>
        <button className="px-[50px] py-[10px] text-[18px] bg-[green] text-[white] md:px-[100px] rounded-lg absolute right-[5%] bottom-[10%]">
          Next
        </button>
      </div>
    </div>
  );
}

export default ListingPage2;
