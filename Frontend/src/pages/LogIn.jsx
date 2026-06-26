import React, { useState, useContext } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AuthDatacontext } from "../Context/AuthContext.jsx";
import axios from "axios";
import { userDataContext } from "../Context/UserContext.jsx";

function LogIn() {
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDatacontext);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { userData, setUserData } = useContext(userDataContext);
  let { loading, setLoading } = useContext(AuthDatacontext);
  const handleLogIn = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      setLoading(false);
      setUserData(result.data);
      navigate("/");
      console.log(result);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };
  return (
    <div className="w-[100w] h-[100vh] flex items-center justify-center relative">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute  top-[10%] left-[20px] rounded-[50%] flex items-center justify-center "
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
      </div>
      <form
        action=""
        className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px] "
        onSubmit={handleLogIn}
      >
        <h1 className="text-[30px] text-[black]">Welcome to Airbnb</h1>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]">
          <label htmlFor="email" className="text-[20px] ">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] relative">
          <label htmlFor="password" className="text-[20px]">
            Password
          </label>
          <input
            type={show ? "text" : "password"}
            id="password"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {show && (
            <IoMdEye
              className="w-[22px] h-[22px] absolute bottom-[10px] right-[12%] cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
          {!show && (
            <IoMdEyeOff
              className="w-[22px] h-[22px] absolute bottom-[10px] right-[12%] cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
        </div>
        <button
          className="px-[50px] py-[10px] text-[18px] bg-[green] text-[white] md:px-[100px] rounded-lg"
          disabled={loading}
        >
          {loading ? "Loading..." : "LogIn"}
        </button>
        <p className="text-[18px]">
          Create new account
          <span
            className="text-[19px] text-[green] cursor-pointer "
            onClick={() => navigate("/SignUp")}
          >
            SignUp
          </span>
        </p>
      </form>
    </div>
  );
}

export default LogIn;
