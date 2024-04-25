/** @format */
import React, { useEffect, useRef } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Home } from "./pages/Home/Home";
import { RequireUser } from "./components/requireUser";
import { Feed } from "./components/feed/Feed";
import { Profile } from "./components/profile/Profile";
import { UpdateProfile } from "./components/updateProfile/UpdateProfile";

// import isLoading from "./redux/slices/appConfigSlice";
import { setLoading } from "./redux/slices/appConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import { OnlyIfNotLoggedin } from "./components/OnlyIfNotLoggedin";
import toast, { Toaster } from "react-hot-toast";
export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";
function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const loadingRef = useRef(null);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);
  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);
  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message);
        break;
    }
  }, [toastData]);
  return (
    <div>
      <LoadingBar color="#000" ref={loadingRef} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route element={<OnlyIfNotLoggedin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
