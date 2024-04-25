/** @format */

import React, { useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
// import Avatar from "../../assets/man.png";
import Avatar from "../avatar/Avatar";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { logoutMe, setLoading } from "../../redux/slices/appConfigSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { KEY_ACCESS_TOKEN } from "../../utils/localStorageManager";
import { axiosClient } from "../../utils/axiosClient";
export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  // const [logout, setLogout] = useState(false);
  async function handleLogoutClicked() {
    try {
      dispatch(setLoading(true));
      await axiosClient.post("/auth/logout");
      localStorage.removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <div className="flex flex-row justify-between lg:border-b lg:border-richblack-100">
        <h1
          className="text-4xl px-8 font-bold cursor-pointer hover:active:text-blue-100 "
          onClick={() => navigate("/")}
        >
          Discover
        </h1>
        <div className="flex flex-row items-center mx-16 gap-x-5">
          {/* <img
            className="h-[50px] px-10 cursor-pointer"
            src={myProfile?.avatar?.url || Avatar}
            alt=""
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          /> */}
          <div
            className="h-[60px] flex items-center"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>

          <div onClick={handleLogoutClicked}>
            <FiLogOut className="text-2xl cursor-pointer font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};
