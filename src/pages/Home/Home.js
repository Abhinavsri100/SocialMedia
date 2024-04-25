/** @format */

import React, { useEffect } from "react";
import { axiosClient } from "../../utils/axiosClient";
import { Navbar } from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, setLoading } from "../../redux/slices/appConfigSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.appConfigReducer.myProfile);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  useEffect(() => {
    // dispatch(setLoading(true));
    dispatch(getMyPosts());
    // dispatch(setLoading(false));
    console.log("This is---->");
  }, [dispatch]);
  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <div className="">
        {" "}
        <Outlet />
      </div>
    </div>
  );
};
