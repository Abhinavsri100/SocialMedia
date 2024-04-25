/** @format */

import React, { useEffect, useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
import Avatar from "../../assets/man.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateProfile } from "../../redux/slices/appConfigSlice";
import { setMyProfile } from "../../redux/slices/appConfigSlice";
export const UpdateProfile = () => {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  useEffect(() => {
    // console.log(userImg);
    // console.log(myProfile);
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar.url);
  }, [myProfile]);
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("params is", params);
    // console.log(myProfile);
    // dispatch(updateProfile({ name, bio, userImg }));

    try {
      dispatch(setLoading(true));
      const response = await axiosClient.put("/user/", {
        name,
        bio,
        userImg,
      });
      dispatch(setMyProfile(response.result.currUser));
      console.log("result --->", response);
    } catch (e) {
      console.log("what is the", e);
    } finally {
      dispatch(setLoading(false));
    }
  }
  function handleImageChange(e) {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const fileReader = new FileReader();
    // console.log(fileReader);
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  }
  return (
    <div className="flex flex-col gap-20">
      <div className="mt-10 flex flex-row gap-28 justify-center">
        <div className="left">
          <div className="input-user-img">
            <label
              htmlFor="userImg"
              className="labelImg w-[110px] h-[110px] rounded-full  "
            >
              <img
                src={userImg}
                className="w-[110px] h-[110px] object-cover rounded-full border-[2px] border-dashed"
                alt=""
              />
            </label>
            <input
              className="hidden"
              id="userImg"
              type="file"
              accept="image/*"
              name=""
              onChange={handleImageChange}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="right flex flex-col gap-5">
            <input
              className="border border-richblack-100 py-2 px-10 rounded-md"
              type="text"
              value={name}
              name=""
              id=""
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-richblack-100 py-2 px-10"
              type="text"
              placeholder="Your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              className="border border-richblack-100 w-[60%] p-1 rounded-md bg-blue-200 text-white "
              type="submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
        <div className="flex justify-center border border-richblack-100  p-3 rounded-md bg-pink-300 text-white">
          <button>Delete Account</button>
        </div>
      </div>
      <div className="flex justify-center text-3xl text-richblack-200">
        PLZZ RELOAD AFTER CLICKING SUBMIT
      </div>
    </div>
  );
};
